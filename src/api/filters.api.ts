import { handleApiResponse } from "./common.api";

export const getFilterValues = async (code: string): Promise<any> => {
    return handleApiResponse<any>(await fetch(`/api/filters/${code}`));    
}