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
    },

    createContract: async (contract, page, pageSize) => {
        const response = await fetch(`http://localhost:3000/contracts/create?page=${page}&pageSize=${pageSize}`, {
            method: "POST",
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify({contract})
        })

        const result = await response.json()

        if (result.status == "ERROR") {
            return false
        }

        return true
    },

    deleteContract: async (contractId, page, pageSize) => {
        const response = await fetch(`http://localhost:3000/contracts/delete/${contractId}?page=${page}&pageSize=${pageSize}`, {
            method: "DELETE",
        })

        const result = await response.json()

        if (result.status == "ERROR") {
            return false
        }

        return true
    },

    updateContract: async (updateParams, page, pageSize) => {
        const response = await fetch(`http://localhost:3000/contracts/update?page=${page}&pageSize=${pageSize}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateParams)
        })

        const result = await response.json()

        if (result.status == "ERROR") {
            return false
        }

        return true
    }
}

export default contractsApi