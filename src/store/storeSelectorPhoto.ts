import { Rect } from '@popperjs/core'
import { Area, Point } from 'react-easy-crop'
import { v1 } from 'uuid'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface IPhoto {
  file: File
  id: string
  url: string | Blob
  name: string
  size: number
  type: string
  cropData?: {
    crop?: Point
    croppedAreaPixels?: Area
    aspect?: number
    zoom?: number
  }
  filteredUrl?: string | Blob
  finalUrl?: string | Blob
  filter?: string
}

interface ISelectorStore {
  imagesSelector: IPhoto[]
  setImageSelector: (imagesSelector: IPhoto[]) => void
  setCropForImage: (id: string, newCrop: Point) => void
  setZoomForImage: (id: string, newZoom: number) => void
  setAspectForImage: (id: string, newAspect: number) => void
  setCroppedAreaPixelsForImage: (id: string, croppedArea: Point, croppedAreaPixels: Area) => void
  setCroppedPhoto: (id: string, croppedPhoto: Point, cropSize: Area) => void
  setFilterForImage: (id: string, filter: string | undefined) => void
}

export const useImageSelector = create<ISelectorStore>()(
  devtools(set => ({
    imagesSelector: [],
    setImageSelector(imagesSelector) {
      const newImages = imagesSelector.map(image => ({
        ...image,
        id: v1(),
      }))

      set(state => ({
        ...state,
        imagesSelector: newImages,
      }))
    },
    setCropForImage(id: string, newCrop: Point) {
      set(state => {
        const imageIndex = state.imagesSelector.findIndex(img => img.id === id) // получаем индекс объекта IPhoto по id

        if (imageIndex === -1) {
          return state // если объект не найден, то возвращаем текущее состояние
        }
        const updatedImage = {
          ...state.imagesSelector[imageIndex],
          cropData: {
            ...state.imagesSelector[imageIndex].cropData,
            crop: newCrop,
          },
        }
        const updatedImages = [...state.imagesSelector]

        updatedImages[imageIndex] = updatedImage

        return {
          ...state,
          imagesSelector: updatedImages,
        }
      })
    },
    setZoomForImage(id: string, newZoom: number) {
      set(state => {
        const imageIndex = state.imagesSelector.findIndex(img => img.id === id) // получаем индекс объекта IPhoto по id

        if (imageIndex === -1) {
          return state // если объект не найден, то возвращаем текущее состояние
        }
        const updatedImage = {
          ...state.imagesSelector[imageIndex],
          cropData: {
            ...state.imagesSelector[imageIndex].cropData,
            zoom: newZoom,
          },
        }
        const updatedImages = [...state.imagesSelector]

        updatedImages[imageIndex] = updatedImage

        return {
          ...state,
          imagesSelector: updatedImages,
        }
      })
    },
    setAspectForImage(id: string, newAspect: number) {
      set(state => {
        const imageIndex = state.imagesSelector.findIndex(img => img.id === id) // получаем индекс объекта IPhoto по id

        if (imageIndex === -1) {
          return state // если объект не найден, то возвращаем текущее состояние
        }
        const updatedImage = {
          ...state.imagesSelector[imageIndex],
          cropData: {
            ...state.imagesSelector[imageIndex].cropData,
            aspect: newAspect,
          },
        }
        const updatedImages = [...state.imagesSelector]

        updatedImages[imageIndex] = updatedImage

        return {
          ...state,
          imagesSelector: updatedImages,
        }
      })
    },
    setCroppedAreaPixelsForImage(id: string, newCroppedArea: Point, newCroppedAreaPixels: Rect) {
      set(state => {
        const imageIndex = state.imagesSelector.findIndex(img => img.id === id)

        if (imageIndex === -1) {
          return state
        }
        // const blob = new Blob([state.imagesSelector[imageIndex].url], { type: 'image/jpeg' })
        // const filteredUrl = URL.createObjectURL(blob)

        const updatedImage = {
          ...state.imagesSelector[imageIndex],
          cropData: {
            ...state.imagesSelector[imageIndex].cropData,
            croppedArea: newCroppedArea,
            croppedAreaPixels: newCroppedAreaPixels,
            // filteredUrl: filteredUrl,
          },
        }

        const updatedImages = [...state.imagesSelector]

        updatedImages[imageIndex] = updatedImage

        return {
          ...state,
          imagesSelector: updatedImages,
        }
      })
    },
    setCroppedPhoto(id: string, croppedPhoto: Point, cropSize: Rect) {
      set((state: ISelectorStore) => {
        const photo = state.imagesSelector.find((photo: IPhoto) => photo.id === id)

        if (photo) {
          const photoIndex = state.imagesSelector.indexOf(photo)

          const blob = new Blob([photo.url], { type: 'image/jpeg' })
          const filteredUrl = URL.createObjectURL(blob)

          debugger
          const updatedPhoto = {
            ...photo,
            cropData: {
              ...photo.cropData,
              crop: croppedPhoto,
              croppedAreaPixels: cropSize,
            },
            filteredUrl: filteredUrl, // добавляем url нового обрезанного изображения
          }

          const updatedImagesSelector = [
            ...state.imagesSelector.slice(0, photoIndex),
            updatedPhoto,
            ...state.imagesSelector.slice(photoIndex + 1),
          ]

          return {
            ...state,
            imagesSelector: updatedImagesSelector,
          }
        }

        return state
      })
    },
    setFilterForImage(id, filter) {
      set(state => {
        const updatedImagesSelector = state.imagesSelector.map(image => {
          debugger
          if (image.id === id) {
            return { ...image, filter }
          }

          return image
        })

        return { imagesSelector: updatedImagesSelector }
      })
    },
  }))
)
