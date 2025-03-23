const contractsApi = {
    getAllContracts: async (page, pageSize) => {
        const response = await fetch(`http://localhost:3000/contracts?page=${page}&paeSize=${pageSize}`, {
            method: "GET",
        })

        const result = await response.json()

        if (result.status == "ERROR") {
            return []
        }

        return {
            contracts: result.contracts,
            totalContracts:  result.count
        }
    }
}

export default contractsApi