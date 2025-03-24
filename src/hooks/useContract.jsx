import { useState, useEffect } from "react"
import contractsApi from "../api/contracts"
import { toast } from "sonner"

const useContract = () => {
    const [contractsLoading, setContractsLoading] = useState(false)
    const [contracts, setContracts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalContracts, setTotalContracts] = useState(0)

    useEffect(() => {
        (async () => {
            setContractsLoading(true)
            await handleGetContracts()
            setContractsLoading(false)
        })()
    }, [currentPage])

    useEffect(() => {
        appServices.socketInst.on("dataUpdated", handleDataUpdated)
    }, [])

    const handleDataUpdated = (args) => {
        if (args.status == "OK") {
            setContracts(args.contracts)
            setTotalContracts(args.count)
        } else {
            toast.info("Please refresh the page to see changes")
        }
    }

    const handleGetContracts = async () => {
        const contractsObj = await getContracts()
        if (contractsObj.status == "ERROR") {
            toast.error("Failed to get the contracts")
            setContracts([])
            setTotalContracts(0)
            return false
        }

        setContracts(contractsObj.contracts)
        setTotalContracts(contractsObj.totalContracts)

        return true
    }

    const getContracts = async () => {
        const contractsObj = await contractsApi.getAllContracts(currentPage, 5)
        return contractsObj
    }

    const addContract = async (contract) => {
        const createRespone = await contractsApi.createContract(contract, currentPage, 5)
        return createRespone
    }

    const deleteContract = async (contractId) => {
        let page = currentPage
        if (page > 0 && contracts.length == 1) {
            page -= 1
        }
        const deleteResponse = await contractsApi.deleteContract(contractId, page, 5)
        return deleteResponse
    }

    const updateContract = async (updateParams) => {
        const updateResponse = await contractsApi.updateContract(updateParams, currentPage, 5)
        return updateResponse
    }

    const getContractsByField = async (value, field = null) => {
        if (!value || value == "All") {
            const contractsResult = await handleGetContracts()
            return contractsResult
        }

        if (!field) {
            field = "clientName"

            if (!isNaN(value)) {
                field = "id"
                value = parseInt(value)
            }
        }

        const result = await contractsApi.getContractsByField(field, value, currentPage, 5)

        if (result.status == "ERROR") {
            return false
        }

        console.log("result.count", result.count)
        setContracts(result.contracts)
        setTotalContracts(result.count)
        return true
    }

    const downloadFile = async (clientName, fileName) => {
        const fileBlob = await contractsApi.downloadFile(clientName, fileName)
        return fileBlob
    }

    return {
        currentPage,
        contracts,
        contractsLoading,
        totalContracts,
        addContract,
        deleteContract,
        updateContract,
        setCurrentPage,
        getContractsByField,
        downloadFile
    }
}

export default useContract