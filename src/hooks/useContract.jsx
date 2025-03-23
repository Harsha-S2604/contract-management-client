import { useState, useEffect } from "react"
import contractsApi from "../api/contracts"

const useContract = () => {
    const [contractsLoading, setContractsLoading] = useState(false)
    const [contracts, setContracts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalContracts, setTotalContracts] = useState(0)

    useEffect(() => {
        (async () => {
            setContractsLoading(true)
            const contractsObj = await getContracts()
            setContracts(contractsObj.contracts)
            setTotalContracts(contractsObj.totalContracts)
            setContractsLoading(false)
        })()
    }, [currentPage])

    const getContracts = async () => {
        const contractsObj = await contractsApi.getAllContracts(currentPage, 5)
        return contractsObj
    }

    const addContract = async (contract) => {
        const createRespone = await contractsApi.createContract(contract)
        return createRespone
    }

    const deleteContract = async (contractId) => {
        const deleteResponse = await contractsApi.deleteContract(contractId)
        return deleteResponse
    }

    const updateContract = async (updateParams) => {
        const updateResponse = await contractsApi.updateContract(updateParams)
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