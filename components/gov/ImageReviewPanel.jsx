'use client'

import { useState } from 'react'

export default function ImageReviewPanel({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageStatuses, setImageStatuses] = useState({})

  const currentImage = images[currentIndex]

  const handleStatusUpdate = (imageId, status) => {
    setImageStatuses((prev) => ({
      ...prev,
      [imageId]: status,
    }))
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-risk-red'
      case 'medium':
        return 'text-risk-orange'
      case 'low':
        return 'text-risk-green'
      default:
        return 'text-gray-400'
    }
  }

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-risk-red/20'
      case 'medium':
        return 'bg-risk-orange/20'
      case 'low':
        return 'bg-risk-green/20'
      default:
        return 'bg-gray-700/20'
    }
  }

  if (!currentImage) {
    return (
      <div className="glass-card">
        <h2 className="text-2xl font-bold grad-text mb-4">Image Review Panel</h2>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No images available for review</p>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card">
      <div className="mb-6">
        <h2 className="text-2xl font-bold grad-text mb-1">Water Image Review</h2>
        <p className="text-gray-400 text-sm">Validate water quality and approve inspections</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Image Display */}
        <div className="col-span-2">
          <div className="bg-dark-border/50 rounded-lg overflow-hidden mb-4 border border-dark-border">
            <img
              src={currentImage.url}
              alt="Water sample"
              className="w-full h-80 object-cover"
            />
          </div>

          <div className="mb-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-white">{currentImage.location}</h3>
                <p className="text-gray-400 text-sm">{currentImage.village}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                currentImage.severity === 'high' ? 'bg-risk-red/30 text-risk-red' :
                currentImage.severity === 'medium' ? 'bg-risk-orange/30 text-risk-orange' :
                'bg-risk-green/30 text-risk-green'
              }`}>
                {currentImage.severity === 'high' ? '🔴' : currentImage.severity === 'medium' ? '🟠' : '🟢'} {currentImage.severity}
              </span>
            </div>

            <p className="text-gray-300 mb-3">{currentImage.description}</p>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>📤 Uploaded {new Date(currentImage.uploadTime).toLocaleString()}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-4">
            <button
              onClick={() => handleStatusUpdate(currentImage.id, 'approved')}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                imageStatuses[currentImage.id] === 'approved'
                  ? 'bg-risk-green/40 text-risk-green border border-risk-green'
                  : 'bg-risk-green/20 hover:bg-risk-green/30 text-risk-green border border-risk-green/50'
              }`}
            >
              ✓ Approve Inspection
            </button>
            <button
              onClick={() => handleStatusUpdate(currentImage.id, 'safe')}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                imageStatuses[currentImage.id] === 'safe'
                  ? 'bg-accent-blue/40 text-accent-blue border border-accent-blue'
                  : 'bg-accent-blue/20 hover:bg-accent-blue/30 text-accent-blue border border-accent-blue/50'
              }`}
            >
              🛡️ Mark Safe
            </button>
            <button
              onClick={() => handleStatusUpdate(currentImage.id, 'escalated')}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                imageStatuses[currentImage.id] === 'escalated'
                  ? 'bg-risk-red/40 text-risk-red border border-risk-red'
                  : 'bg-risk-red/20 hover:bg-risk-red/30 text-risk-red border border-risk-red/50'
              }`}
            >
              📍 Escalate
            </button>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
              className="px-4 py-2 bg-dark-border hover:bg-dark-border/80 rounded-lg transition-colors"
            >
              ← Previous
            </button>
            <span className="text-gray-400 text-sm">
              {currentIndex + 1} of {images.length}
            </span>
            <button
              onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
              className="px-4 py-2 bg-dark-border hover:bg-dark-border/80 rounded-lg transition-colors"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Thumbnail List */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Queue ({images.length})</h3>
          <div className="space-y-2">
            {images.map((image, idx) => (
              <div
                key={image.id}
                onClick={() => setCurrentIndex(idx)}
                className={`cursor-pointer p-3 rounded-lg transition-all border ${
                  currentIndex === idx
                    ? 'border-accent-cyan bg-accent-cyan/20'
                    : 'border-dark-border hover:border-dark-border/80 bg-dark-border/30'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-300">{image.location}</span>
                  <span className={`text-xs px-2 py-1 rounded ${getSeverityBg(image.severity)} ${getSeverityColor(image.severity)}`}>
                    {image.severity}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{image.village}</p>
                {imageStatuses[image.id] && (
                  <div className="text-xs text-accent-cyan mt-2 font-semibold">
                    ✓ {imageStatuses[image.id]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
