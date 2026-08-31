import { httpClient } from "../lib"
import { APIResponse, IMediaFilters, MediaFileType } from "../types"

export const mediaService = {
  list: async (filters?: IMediaFilters): Promise<MediaFileType[]> => {
    const { data } = await httpClient.get<APIResponse<MediaFileType[]>>(
      "/media",
      { params: filters }
    )
    return data.data
  },
  getByEntity: async (
    entityType: string,
    entityId: string
  ): Promise<MediaFileType[]> => {
    const { data } = await httpClient.get<APIResponse<MediaFileType[]>>(
      "/media/entity",
      { params: { entityType, entityId } }
    )
    return data.data
  },
  assign: async (payload: {
    mediaFileId: string
    entityType: string
    entityId: string
    fieldName?: string
  }): Promise<MediaFileType> => {
    const { data } = await httpClient.post<APIResponse<MediaFileType>>(
      "/media/assign",
      payload
    )
    return data.data
  },
  assignMany: async (payload: {
    mediaFileIds: string[]
    entityType: string
    entityId: string
    fieldName?: string
  }): Promise<MediaFileType[]> => {
    const { data } = await httpClient.post<APIResponse<MediaFileType[]>>(
      "/media/bulk/assign",
      payload
    )
    return data.data
  },
  remove: async (id: string): Promise<void> => {
    await httpClient.delete(`/media/${id}`)
  },
  removeMany: async (mediaFileIds: string[]): Promise<void> => {
    await httpClient.delete("/media/bulk/ delete", { data: { mediaFileIds } })
  },
  rename: async (id: string, fileName: string): Promise<MediaFileType> => {
    const { data } = await httpClient.patch<APIResponse<MediaFileType>>(
      `/media/${id}/rename`,
      {
        fileName,
      }
    )
    return data.data
  },
}
