export const getFilterValues = async (code: string): Promise<any> => {
    return fetch(`/api/filters/${code}`).then(r => r.json());
}