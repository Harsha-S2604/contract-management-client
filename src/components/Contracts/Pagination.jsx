import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination"

const PaginationUI = ({ page, pageSize, totalPages, onPageChange }) => {

    const getDisplayedPages = () => {
        const delta = 2

        const range = (start, end) => {
            let result = [];
            for (let i = start; i <= end; i++) {
                if (i >= 1 && i <= totalPages) {
                    result.push(i);
                }
            }
            return result;
        }

        if (totalPages <= 5) {
            return range(1, totalPages)
        }

        if (page <= delta + 1) {
            return range(1, delta + 2)
        }

        if (page >= totalPages - delta) {
            return range(totalPages - delta - 1, totalPages)
        }

        return [
            1,
            <PaginationEllipsis key="ellipsis1" />,
            ...range(page - delta, page + delta),
            <PaginationEllipsis key="ellipsis2" />,
            totalPages,
        ]
    }

    const paginationItems = () => {
        const displayedPages = getDisplayedPages()
        return displayedPages.map((item, index) => {
            if (item === <PaginationEllipsis key="ellipsis1" /> || item === <PaginationEllipsis key="ellipsis2" />) {
                return (
                    <PaginationItem key={index}>
                        <PaginationEllipsis />
                    </PaginationItem>
                )
            }

            return (
                <PaginationItem key={item} className="cursor-pointer">
                    <PaginationLink
                        onClick={() => onPageChange(item)}
                        isActive={item === page}
                    >
                        {item}
                    </PaginationLink>
                </PaginationItem>
            );
        });
    };

    const isPreviousDisabled = page <= 1;
    const isNextDisabled = page >= totalPages;

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        className="cursor-pointer"
                        onClick={() => {
                            if ((page - 1) > 0) {
                                onPageChange(page - 1)
                            }
                        }}
                        disabled={isPreviousDisabled}
                    />
                </PaginationItem>
                {paginationItems()}
                <PaginationItem>
                    <PaginationNext
                        className="cursor-pointer"
                        onClick={() => {
                            if ((page + 1) <= totalPages) {
                                onPageChange(page + 1)
                            }
                        }}
                        disabled={isNextDisabled}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationUI;
