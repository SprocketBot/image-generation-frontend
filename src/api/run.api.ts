export const runReport = async (reportCode: string, inputFile:string, outputFile: string, filterValues: Record<string, string | number>) => {
    fetch(`/api/exec/${reportCode}`, {
        method: "POST",
        body: JSON.stringify(
            {
                inputFile: `${reportCode}/${inputFile}`,
                outputFile: outputFile,
                filterValues
            }
        )
    })
}