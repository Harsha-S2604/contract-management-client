import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "../ui/dialog"
import { Button } from "../ui/button"

const AddForm = ({ uiLoading, onSubmit }) => {
    const [fileData, setFileData] = useState([])
    const [clientName, setClientName] = useState('')
    const [contractStatus, setContractStatus] = useState('Draft')
    const [contractFile, setContractFile] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setContractFile(file)

            if (file) {
                const reader = new FileReader()
                reader.onloadend = () => {
                    const buffer = reader.result
                    setFileData(buffer)
                }

                reader.readAsDataURL(file)
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!clientName || !contractFile) {
            setErrorMessage("Please fill out all fields and upload a file.")
            return
        }

        const newContract = {
            clientName,
            status: contractStatus,
            contractData: contractFile.name,
            file: {
                fileName: contractFile.name,
                fileType: contractFile.type,
                fileBase64: fileData
            }
        }

        onSubmit(newContract)

        setErrorMessage('')
    }

    return (
        <div className="space-y-4">
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
                <Button
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md cursor-pointer"
                    onClick={() => {
                        setClientName('')
                        setErrorMessage('')
                        setContractStatus('Draft')
                        setContractFile(null)
                    }}
                    disabled={uiLoading}
                >
                    Clear
                </Button>

                <Button
                    className="px-4 py-2 bg-primary text-white rounded-md cursor-pointer"
                    disabled={uiLoading}
                    onClick={handleSubmit}
                >
                    { uiLoading ? "Adding..." : "Add Contract" }
                </Button>
            </div>
            <div className='text-red-500'>
                {errorMessage ? "*" + errorMessage : null}
            </div>
        </div>
    )
}

const AddContractDialog = ({ uiLoading, handleAddContract, addContractDialogOpen, setAddContractDialogOpen }) => {
    return (
        <Dialog open={addContractDialogOpen} onOpenChange={setAddContractDialogOpen}>
            <DialogContent>
                <DialogTitle>Add New Contract</DialogTitle>
                <DialogDescription>
                    Please fill in the contract details.
                </DialogDescription>
                <AddForm onSubmit={handleAddContract} uiLoading={uiLoading} />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" disabled={uiLoading}>Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default AddContractDialog
