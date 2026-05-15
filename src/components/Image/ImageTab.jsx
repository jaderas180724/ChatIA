import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wand2, Download, Trash2, Loader } from 'lucide-react'
import { useImageStore } from '../../store/index'

const ImageTab = () => {
  const [prompt, setPrompt] = React.useState('')
  const [selectedModel, setSelectedModel] = React.useState('gemini')
  
  const images = useImageStore((state) => state.images)
  const isGenerating = useImageStore((state) => state.isGenerating)
  const setIsGenerating = useImageStore((state) => state.setIsGenerating)
  const addImage = useImageStore((state) => state.addImage)
  const removeImage = useImageStore((state) => state.removeImage)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    setTimeout(() => {
      addImage({
        id: Date.now(),
        prompt,
        url: `https://api.placeholder.com/512?text=${encodeURIComponent(prompt)}`,
        model: selectedModel,
        createdAt: new Date(),
      })
      setIsGenerating(false)
      setPrompt('')
    }, 2000)
  }

  return (
    <div className="flex flex-col h-full bg-dark-bg">
      {/* Generator Section */}
      <motion.div
        className="p-4 border-b border-white/10 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="w-full px-4 py-2 bg-dark-secondary border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-accent-blue"
        >
          <option value="gemini">🖼️ Gemini Vision</option>
          <option value="dalle">🎨 DALL-E 3</option>
          <option value="midjourney">✨ Midjourney</option>
        </select>

        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="Describe the image you want to create..."
            className="flex-1 px-4 py-3 bg-dark-secondary border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent-blue text-sm"
            disabled={isGenerating}
          />
          <motion.button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-accent-cyan to-accent-blue rounded-xl p-3 text-white disabled:opacity-50"
          >
            {isGenerating ? (
              <Loader size={18} className="animate-spin" />
            ) : (
              <Wand2 size={18} />
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Generated Images Gallery */}
      <div className="flex-1 overflow-y-auto p-4">
        {images.length === 0 ? (
          <motion.div
            className="h-full flex flex-col items-center justify-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Wand2 size={48} className="mb-4 text-accent-cyan/30" />
            <p>Create your first image</p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-2 gap-4"
            layout
          >
            <AnimatePresence>
              {images.map((image) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative group"
                >
                  <img
                    src={image.url}
                    alt={image.prompt}
                    className="w-full h-40 rounded-lg object-cover border border-white/10"
                  />
                  <motion.div
                    className="absolute inset-0 bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 gap-2"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <button className="flex-1 bg-accent-blue text-white py-1 rounded flex items-center justify-center gap-1 text-xs hover:bg-accent-blue/80">
                      <Download size={12} />
                      Download
                    </button>
                    <button
                      onClick={() => removeImage(image.id)}
                      className="bg-red-600/70 text-white p-1 rounded hover:bg-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </motion.div>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                    {image.prompt}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ImageTab
