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
            await handlePageChange()
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

    const handlePageChange = async () => {
        const contractsObj = await getContracts()
        setContracts(contractsObj.contracts)
        setTotalContracts(contractsObj.totalContracts)
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

    return {
        currentPage,
        contracts,
        contractsLoading,
        totalContracts,
        addContract,
        deleteContract,
        updateContract,
        setCurrentPage
    }
}

export default useContract