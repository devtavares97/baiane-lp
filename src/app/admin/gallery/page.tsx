"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Upload, CheckCircle, XCircle, Loader2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { bulkUploadImages } from "@/lib/admin/upload";
import { getAllGalleryItems, deleteGalleryItem } from "@/lib/admin/gallery-manager";
import type { GalleryItem } from "@/types/supabase";

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

interface FileWithPreview {
  file: File;
  preview: string;
  status: UploadStatus;
  error?: string;
}

export default function GalleryPage() {
  const [category, setCategory] = useState<'portfolio' | 'logo'>('portfolio');
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadGalleryItems();
  }, []);

  async function loadGalleryItems() {
    setLoadingGallery(true);
    const items = await getAllGalleryItems();
    setGalleryItems(items);
    setLoadingGallery(false);
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith('image/')
    );

    addFiles(droppedFiles);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      addFiles(selectedFiles);
    }
  }, []);

  const addFiles = (newFiles: File[]) => {
    const filesWithPreview: FileWithPreview[] = newFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      status: 'idle' as UploadStatus,
    }));

    setFiles(prev => [...prev, ...filesWithPreview]);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);

    const filesToUpload = files.map(f => f.file);

    try {
      const result = await bulkUploadImages(filesToUpload, category);

      setFiles(prev => prev.map((f, index) => ({
        ...f,
        status: index < result.success ? 'success' : 'error',
        error: index >= result.success ? result.errors[index - result.success] : undefined,
      })));

      if (result.failed === 0) {
        setTimeout(() => {
          setFiles([]);
          loadGalleryItems();
        }, 3000);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setFiles(prev => prev.map(f => ({
        ...f,
        status: 'error',
        error: 'Erro ao fazer upload',
      })));
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const clearAll = () => {
    files.forEach(f => URL.revokeObjectURL(f.preview));
    setFiles([]);
  };

  const handleDelete = async (item: GalleryItem) => {
    if (!confirm(`Deletar "${item.caption || item.alt}"?`)) return;

    setDeletingIds(prev => new Set(prev).add(item.id));

    const success = await deleteGalleryItem(item.id, item.image_url);

    if (success) {
      setGalleryItems(prev => prev.filter(i => i.id !== item.id));
    } else {
      alert('Erro ao deletar imagem');
    }

    setDeletingIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(item.id);
      return newSet;
    });
  };

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-4xl font-bold text-white mb-2">
          Gerenciador de Mídia
        </h1>
        <p className="font-body text-text-muted">
          Upload e gestão de imagens do site
        </p>
      </motion.div>

      {/* Category Select */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <label className="font-body text-sm font-semibold text-white uppercase tracking-wider mb-3 block">
          Categoria
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setCategory('portfolio')}
            disabled={uploading}
            className={cn(
              "p-6 rounded-xl border-2 transition-all duration-300",
              "font-body text-lg font-semibold",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              category === 'portfolio'
                ? "border-primary bg-primary/10 text-white"
                : "border-white/10 bg-white/5 text-text-muted hover:border-white/20 hover:bg-white/10"
            )}
          >
            📸 Portfólio
            <p className="text-xs font-normal mt-2 opacity-60">
              Galeria visual do site
            </p>
          </button>
          <button
            onClick={() => setCategory('logo')}
            disabled={uploading}
            className={cn(
              "p-6 rounded-xl border-2 transition-all duration-300",
              "font-body text-lg font-semibold",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              category === 'logo'
                ? "border-primary bg-primary/10 text-white"
                : "border-white/10 bg-white/5 text-text-muted hover:border-white/20 hover:bg-white/10"
            )}
          >
            🏢 Logos
            <p className="text-xs font-normal mt-2 opacity-60">
              Clientes e parceiros
            </p>
          </button>
        </div>
      </motion.div>

      {/* Drag & Drop Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-12",
          "flex flex-col items-center justify-center",
          "transition-all duration-300 cursor-pointer",
          "min-h-[300px] mb-6",
          dragActive
            ? "border-primary bg-primary/10"
            : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
        )}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />

        <div className="space-y-6 text-center pointer-events-none">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10">
            <Upload className="w-10 h-10 text-white/60" strokeWidth={1.5} />
          </div>
          <div>
            <p className="font-body text-lg text-white font-semibold">
              Arraste imagens aqui
            </p>
            <p className="font-body text-sm text-text-muted mt-2">
              ou clique para selecionar arquivos
            </p>
          </div>
          <p className="font-body text-xs text-text-muted">
            Formatos aceitos: JPG, PNG, WebP, SVG
          </p>
        </div>
      </motion.div>

      {/* File List */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 mb-8"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-body text-sm font-semibold text-white uppercase tracking-wider">
              Arquivos ({files.length})
            </h3>
            <button
              onClick={clearAll}
              disabled={uploading}
              className="font-body text-xs text-text-muted hover:text-white transition-colors disabled:opacity-50"
            >
              Limpar tudo
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {files.map((fileItem, index) => (
              <div
                key={index}
                className={cn(
                  "relative group rounded-lg overflow-hidden",
                  "bg-white/5 border border-white/10",
                  "aspect-square"
                )}
              >
                <img
                  src={fileItem.preview}
                  alt={fileItem.file.name}
                  className="w-full h-full object-cover"
                />

                {fileItem.status !== 'idle' && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    {fileItem.status === 'uploading' && (
                      <Loader2 className="w-8 h-8 text-white animate-spin" />
                    )}
                    {fileItem.status === 'success' && (
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    )}
                    {fileItem.status === 'error' && (
                      <XCircle className="w-8 h-8 text-red-500" />
                    )}
                  </div>
                )}

                {fileItem.status === 'idle' && !uploading && (
                  <button
                    onClick={() => removeFile(index)}
                    className={cn(
                      "absolute top-2 right-2",
                      "w-6 h-6 rounded-full bg-red-500",
                      "flex items-center justify-center",
                      "opacity-0 group-hover:opacity-100 transition-opacity"
                    )}
                  >
                    <XCircle className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={uploading || files.length === 0}
            className={cn(
              "w-full py-4 px-6 rounded-xl",
              "bg-primary text-white font-body font-semibold",
              "hover:bg-primary/90 transition-all duration-300",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "flex items-center justify-center gap-3"
            )}
          >
            {uploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Fazendo upload...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Fazer Upload de {files.length} {files.length === 1 ? 'arquivo' : 'arquivos'}
              </>
            )}
          </button>
        </motion.div>
      )}

      {/* Galeria Existente */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4 pt-8 border-t border-white/10"
      >
        <h3 className="font-body text-sm font-semibold text-white uppercase tracking-wider">
          Imagens Atuais
        </h3>

        {loadingGallery ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        ) : galleryItems.length === 0 ? (
          <div className="text-center py-12 rounded-xl bg-white/5">
            <p className="font-body text-text-muted">Nenhuma imagem cadastrada</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Portfolio */}
            {galleryItems.filter(i => i.category === 'portfolio').length > 0 && (
              <div className="space-y-3">
                <h4 className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">
                  📸 Portfólio ({galleryItems.filter(i => i.category === 'portfolio').length})
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {galleryItems
                    .filter(i => i.category === 'portfolio')
                    .map(item => (
                      <div
                        key={item.id}
                        className="relative group rounded-lg overflow-hidden bg-white/5 border border-white/10 aspect-square"
                      >
                        <Image
                          src={item.image_url}
                          alt={item.alt}
                          fill
                          className="object-cover"
                          sizes="200px"
                        />
                        
                        <button
                          onClick={() => handleDelete(item)}
                          disabled={deletingIds.has(item.id)}
                          className={cn(
                            "absolute top-2 right-2 p-2 rounded-full",
                            "bg-red-500 text-white",
                            "opacity-0 group-hover:opacity-100",
                            "transition-opacity",
                            "hover:bg-red-600",
                            "disabled:opacity-50 disabled:cursor-not-allowed"
                          )}
                        >
                          {deletingIds.has(item.id) ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>

                        {item.caption && (
                          <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 backdrop-blur-sm">
                            <p className="font-body text-xs text-white truncate">
                              {item.caption}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Logos */}
            {galleryItems.filter(i => i.category === 'logo').length > 0 && (
              <div className="space-y-3">
                <h4 className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">
                  🏢 Logos ({galleryItems.filter(i => i.category === 'logo').length})
                </h4>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {galleryItems
                    .filter(i => i.category === 'logo')
                    .map(item => (
                      <div
                        key={item.id}
                        className="relative group rounded-lg overflow-hidden bg-white/5 border border-white/10 aspect-video"
                      >
                        <Image
                          src={item.image_url}
                          alt={item.alt}
                          fill
                          className="object-contain p-2"
                          sizes="150px"
                        />
                        
                        <button
                          onClick={() => handleDelete(item)}
                          disabled={deletingIds.has(item.id)}
                          className={cn(
                            "absolute top-1 right-1 p-1.5 rounded-full",
                            "bg-red-500 text-white",
                            "opacity-0 group-hover:opacity-100",
                            "transition-opacity",
                            "hover:bg-red-600",
                            "disabled:opacity-50 disabled:cursor-not-allowed"
                          )}
                        >
                          {deletingIds.has(item.id) ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Trash2 className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
