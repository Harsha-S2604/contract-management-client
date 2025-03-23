import { useEffect, useRef, useState } from "react"
import { Plus, Trash, File, Download, Upload } from "lucide-react"

import Loader from "../ui/loader"
import { Button } from "../ui/button"
import AddContractDialog from "./AddContractDialog"
import PaginationUI from "./Pagination"

import DeleteDialogConfirmation from "../ui/DeleteDialog"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import useContract from "../../hooks/useContract"
import { toast } from "sonner"

const Contracts = () => {
    const fileInputRef = useRef(null);
    const [contractToDelete, setContractToDelete] = useState(null);
    const [uiLoading, setUILoading] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [addContractDialogOpen, setAddContractDialogOpen] = useState(false)
    
    const { currentPage, totalContracts, setCurrentPage, contracts, contractsLoading, addContract, deleteContract, updateContract } = useContract()

    const handleAddContract = async (newContract) => {
        setUILoading(true)
        const contractAdded = await addContract(newContract)
        if (!contractAdded) {
            toast.error("Something went wrong please try again later!")
        } else {
            toast.success("Contract added")
            setAddContractDialogOpen(false)
        }
        setUILoading(false)
    }

    const handleDeleteContract = async () => {
        const contractDeleted = await deleteContract(contractToDelete)
        if (!contractDeleted) {
            toast.error("Something went wrong please try again later!")
            return
        }

        toast.success("Contract deleted")
        setContractToDelete(null)
    }

    const handleUpdateContract = async (id, key, value) => {
        const updateParams = {
            id,
            key,
            value
        }

        const contractUpdated = await updateContract(updateParams)
        if (!contractUpdated) {
            toast.error("Failed to update the contract!")
            return
        }

        toast.success("Contract updated")
    }

    const handleFileDownload = () => {

    }

    const handleFileUpdate = (index) => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("File selected:", file);
        }
    }

    if (contractsLoading) {
        return (
            <Loader />
        )
    }


    const totalPages = Math.ceil(totalContracts / 5)
    return (
        <>
            {contracts.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-10 p-10 text-center bg-gray-50 rounded-lg shadow-md w-96 mx-auto">
                    <p className="text-lg text-gray-600 mb-4">It looks like there are no contracts here yet.</p>
                    <Button
                        variant="outline"
                        onClick={(e) => {
                            e.stopPropagation()
                            setAddContractDialogOpen(true)
                        }}
                        className="cursor-pointer flex items-center space-x-2 text-white bg-primary">
                        <Plus /> <span>Add Contract</span>
                    </Button>
                </div>
            ) : (
                <div className="p-14">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">Contracts</h2>
                        <Button
                            variant="outline"
                            onClick={(e) => {
                                e.stopPropagation()
                                setAddContractDialogOpen(true)
                            }}
                            className="cursor-pointer flex items-center space-x-2 text-white bg-primary">
                            <Plus className="h-5 w-5" />
                            <span>Add Contract</span>
                        </Button>
                    </div>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <Table className="table-auto w-full">
                            <TableHeader className="bg-gray-100">
                                <TableRow>
                                    <TableHead className="text-left py-2 px-4 text-gray-600">Contracter ID</TableHead>
                                    <TableHead className="text-left py-2 px-4 text-gray-600">Client Name</TableHead>
                                    <TableHead className="text-left py-2 px-4 text-gray-600">Status</TableHead>
                                    <TableHead className="text-left py-2 px-4 text-gray-600">Contract Data</TableHead>
                                    <TableHead className="text-left py-2 px-4 text-gray-600">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {contracts.map((contract, index) => {
                                    const locationSplits = contract.contract_data.split("/")
                                    const fileName = locationSplits ? locationSplits[locationSplits.length - 1] : "Unknown File"

                                    return (
                                        <TableRow key={index} className="hover:bg-gray-50 transition-colors duration-300">
                                            <TableCell className="py-3 px-4">{contract.id}</TableCell>
                                            <TableCell className="py-3 px-4">{contract.client_name}</TableCell>
                                            <TableCell
                                                className={`py-3 px-4`}>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button style={{ outline: 'none', boxShadow: 'none' }} variant="ghost">
                                                            <span className={`${contract.status === "Draft" ? "text-yellow-600" : "text-green-600"}`}>{contract.status}</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuRadioGroup value={contract.status} onValueChange={(status) => handleUpdateContract(contract.id, "status", status)}>
                                                            <DropdownMenuRadioItem value="Draft">Draft</DropdownMenuRadioItem>
                                                            <DropdownMenuRadioItem value="Finalized">Finalized</DropdownMenuRadioItem>
                                                        </DropdownMenuRadioGroup>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                            <TableCell className="py-2 px-4 text-sm text-blue-500">
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <div className="flex text-primary gap-2 items-center cursor-pointer">
                                                            <File />
                                                            <span>{fileName}</span>
                                                        </div>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <div>
                                                            <Button
                                                                style={{ outline: 'none', boxShadow: 'none' }}
                                                                variant="ghost"
                                                                className="w-50 p-2 flex items-center space-x-2"
                                                                onClick={() => handleFileDownload(contract.contract_data)}
                                                            >
                                                                <Download className="h-4 w-4" />
                                                                <span>Download File</span>
                                                            </Button>
                                                        </div>
                                                        <div>
                                                            <Button
                                                                variant="ghost"
                                                                className="w-50 text-blue-600 p-2 flex items-center space-x-2"
                                                                onClick={() => handleFileUpdate(index)}
                                                            >
                                                                <Upload className="h-4 w-4" />
                                                                <span>Update File</span>
                                                            </Button>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </TableCell>
                                            <TableCell className="py-2 px-4 flex items-center justify-start space-x-2">
                                                <Trash className="cursor-pointer text-red-600" onClick={(e) => {
                                                    e.stopPropagation()
                                                    setDeleteDialogOpen(true)
                                                    setContractToDelete(contract.id)
                                                }} />
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}

            <DeleteDialogConfirmation
                dialogOpen={deleteDialogOpen}
                setDialogOpen={setDeleteDialogOpen}
                deleteCB={handleDeleteContract}
            />

            <AddContractDialog
                uiLoading={uiLoading}
                addContractDialogOpen={addContractDialogOpen}
                setAddContractDialogOpen={setAddContractDialogOpen}
                handleAddContract={handleAddContract}
            />

            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept=".txt, .json"
            />

            <PaginationUI page={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
    )
}

export default Contracts
