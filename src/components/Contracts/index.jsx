import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { CalendarIcon, CheckCircle, Clock, AlertCircle, Plus, Trash } from "lucide-react";

const contractsData = [
    {
        contracterId: "123",
        clientName: "ABC consultancy",
        contractStatus: "Draft",
        contractData: "/folderA/file1.txt",
    },
    {
        contracterId: "120",
        clientName: "DEF consultancy",
        contractStatus: "Finalized",
        contractData: "/folderB/file2.txt",
    },
    {
        contracterId: "121",
        clientName: "DEF consultancy",
        contractStatus: "Draft",
        contractData: "/folderB/file2.txt",
    },
    {
        contracterId: "122",
        clientName: "DEF consultancy",
        contractStatus: "Draft",
        contractData: "/folderB/file2.txt",
    },
    {
        contracterId: "126",
        clientName: "DEF consultancy",
        contractStatus: "Finalized",
        contractData: "/folderB/file2.txt",
    }
];

const Contracts = () => {
    return (
        <>
            {
                !contractsData || !contractsData.length ? (
                    <div className="flex flex-col items-center justify-center mt-10 p-10 text-center bg-gray-50 rounded-lg shadow-md w-96 mx-auto">
                        <div className="mb-4">
                            <AlertCircle className="h-12 w-12 text-gray-400 " />
                        </div>
                        <p className="text-lg text-gray-600 mb-4">It looks like there are no contracts here yet.</p>
                        <Button
                            variant="outline"
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            className="cursor-pointer flex items-center space-x-2 text-white bg-[#5f43b2]">
                            <Plus /> <span>Add Contract</span>
                        </Button>
                    </div>

                ) :
                    <div className="p-14">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold">Contracts</h2>
                            <Button
                                variant="outline"
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                className="cursor-pointer flex items-center space-x-2 text-white bg-[#5f43b2]">
                                <Plus className="h-5 w-5" />
                                <span>Add Contract</span>
                            </Button>
                        </div>
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <Table className="table-auto w-full">
                                <TableHeader className="bg-gray-200">
                                    <TableRow>
                                        <TableHead className="text-left py-2 px-4 text-gray-600">Contracter ID</TableHead>
                                        <TableHead className="text-left py-2 px-4 text-gray-600">Client Name</TableHead>
                                        <TableHead className="text-left py-2 px-4 text-gray-600">Status</TableHead>
                                        <TableHead className="text-left py-2 px-4 text-gray-600">Contract Data</TableHead>
                                        <TableHead className="text-left py-2 px-4 text-gray-600">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {contractsData.map((contract, index) => (
                                        <TableRow
                                            key={index}
                                            className="hover:bg-gray-50 transition-colors duration-300"
                                        >
                                            <TableCell className="py-3 px-4">{contract.contracterId}</TableCell>
                                            <TableCell className="py-3 px-4">{contract.clientName}</TableCell>
                                            <TableCell
                                                className={`py-2 px-4 ${contract.contractStatus === "Draft" ? "text-yellow-600" : "text-green-600"
                                                    }`}
                                            >
                                                {contract.contractStatus}
                                            </TableCell>
                                            <TableCell className="py-2 px-4 text-sm text-blue-500">
                                                <a href={contract.contractData} target="_blank" rel="noopener noreferrer" className="underline">
                                                    View File
                                                </a>
                                            </TableCell>
                                            <TableCell className="py-2 px-4 flex items-center justify-start space-x-2">
                                                <Trash className="cursor-pointer text-red-600" />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
            }
        </>

    );
};

export default Contracts;
