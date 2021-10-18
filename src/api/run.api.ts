export const runReport = async (reportCode: string, inputFile:string, outputFile: string, filterValues: Record<string, string | number>):Promise<boolean> => {
    let res = await fetch(`/api/exec/${reportCode}`, {
        method: "POST",
        body: JSON.stringify(
            {
                inputFile: `${reportCode}/${inputFile}`,
                outputFile: outputFile,
                filterValues
            }
        )
    })
    return res.status === 200
}