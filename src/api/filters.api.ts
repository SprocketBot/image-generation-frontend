export const getFilterValues = async (code: string): Promise<any> => {
    const response = await fetch(`/api/filters/${code}`);
    return new Promise((res, rej) => {
        if (response.status !== 200) {
            rej();
        }
        res(response.json());
    })
        
}