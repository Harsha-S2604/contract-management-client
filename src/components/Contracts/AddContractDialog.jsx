import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "../ui/dialog"
import { Button } from "../ui/button"

const AddForm = ({ onSubmit }) => {
    const [clientName, setClientName] = useState('')
    const [contractStatus, setContractStatus] = useState('Draft')
    const [contractFile, setContractFile] = useState(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setContractFile(file)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!clientName || !contractFile) {
            alert("Please fill out all fields and upload a file.")
            return
        }

        const newContract = {
            contracterId: Math.random().toString(36).substr(2, 9), // Generate random ID
            clientName,
            contractStatus,
            contractData: URL.createObjectURL(contractFile), // Generate a temporary URL for the file
        }

        onSubmit(newContract)

        // Clear form fields after submitting
        setClientName('')
        setContractStatus('Draft')
        setContractFile(null)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="clientName" className="block text-sm font-semibold">Client Name</label>
                <input
                    type="text"
                    id="clientName"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
            </div>

            <div>
                <label htmlFor="contractStatus" className="block text-sm font-semibold">Contract Status</label>
                <select
                    id="contractStatus"
                    value={contractStatus}
                    onChange={(e) => setContractStatus(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                    <option value="Draft">Draft</option>
                    <option value="Finalized">Finalized</option>
                </select>
            </div>

            <div>
                <label htmlFor="contractFile" className="block text-sm font-semibold">Upload Contract File</label>
                <input
                    type="file"
                    id="contractFile"
                    onChange={handleFileChange}
                    accept=".txt, .json"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
            </div>

            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={() => {
                        setClientName('')
                        setContractStatus('Draft')
                        setContractFile(null)
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                >
                    Clear
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md"
                >
                    Add Contract
                </button>
            </div>
        </form>
    )
}

const AddContractDialog = ({ handleAddContract, addContractDialogOpen,  setAddContractDialogOpen}) => {
    return (
        <Dialog open={addContractDialogOpen} onOpenChange={setAddContractDialogOpen}>
            <DialogContent>
                <DialogTitle>Add New Contract</DialogTitle>
                <DialogDescription>
                    Please fill in the contract details.
                </DialogDescription>
                <AddForm onSubmit={handleAddContract} />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default AddContractDialog
