export const runReport = async (reportCode: string, filterValues: Record<string, string | number>) => {
    fetch(`/api/exec/${reportCode}`, {
        method: "POST",
        body: JSON.stringify({
            filterValues
        })
    })
}