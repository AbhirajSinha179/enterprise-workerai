"use client";

import { type ReactNode, useCallback } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export interface PaginationWithLinksProps {
    pageSizeSelectOptions?: {
        pageSizeSearchParam?: string;
        pageSizeOptions: number[];
    };
    totalCount: number;
    pageSize: number;
    page: number;
    pageSearchParam?: string;
    onPageChange: (newPage: number) => void;
}

export function PaginationWithLinks({
    pageSizeSelectOptions,
    pageSize,
    totalCount,
    page,
    pageSearchParam,
    onPageChange,
}: PaginationWithLinksProps) {
    // const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageCount = 100

    const handlePageClick = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPageCount) {
            onPageChange(newPage);
        }
    };

    const renderPageNumbers = () => {
        const items: ReactNode[] = [];
        const maxVisiblePages = 5;

        if (totalPageCount <= maxVisiblePages) {
            for (let i = 1; i <= totalPageCount; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            href="#"
                            isActive={page === i}
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageClick(i);
                            }}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>,
                );
            }
        } else {
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink
                        href="#"
                        isActive={page === 1}
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageClick(1);
                        }}
                    >
                        1
                    </PaginationLink>
                </PaginationItem>,
            );

            if (page > 3) {
                items.push(
                    <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                    </PaginationItem>,
                );
            }

            const start = Math.max(2, page - 1);
            const end = Math.min(totalPageCount - 1, page + 1);

            for (let i = start; i <= end; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            href="#"
                            isActive={page === i}
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageClick(i);
                            }}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>,
                );
            }

            if (page < totalPageCount - 2) {
                items.push(
                    <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                    </PaginationItem>,
                );
            }

            items.push(
                <PaginationItem key={totalPageCount}>
                    <PaginationLink
                        href="#"
                        isActive={page === totalPageCount}
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageClick(totalPageCount);
                        }}
                    >
                        {totalPageCount}
                    </PaginationLink>
                </PaginationItem>,
            );
        }

        return items;
    };

    return (
        <div className="flex flex-col md:flex-row items-center gap-3 w-full">
            {/* {pageSizeSelectOptions && (
                <div className="flex flex-col gap-4 flex-1">
                    <SelectRowsPerPage
                        options={pageSizeSelectOptions.pageSizeOptions}
                        // setPageSize={navToPageSize}
                        pageSize={pageSize}
                    />
                </div>
            )} */}
            <Pagination className={cn({ "md:justify-end": pageSizeSelectOptions })}>
                <PaginationContent className="max-sm:gap-0">
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            aria-disabled={page === 1}
                            tabIndex={page === 1 ? -1 : undefined}
                            className={page === 1 ? "pointer-events-none opacity-50" : undefined}
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageClick(Math.max(page - 1, 1));
                            }}
                        />
                    </PaginationItem>
                    {renderPageNumbers()}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            aria-disabled={page === totalPageCount}
                            tabIndex={page === totalPageCount ? -1 : undefined}
                            className={page === totalPageCount ? "pointer-events-none opacity-50" : undefined}
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageClick(Math.min(page + 1, totalPageCount));
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}

function SelectRowsPerPage({
    options,
    setPageSize,
    pageSize,
}: {
    options: number[];
    setPageSize: (newSize: number) => void;
    pageSize: number;
}) {
    return (
        <div className="flex items-center gap-4">
            <span className="whitespace-nowrap text-sm">Rows per page</span>

            <Select value={String(pageSize)} onValueChange={(value) => setPageSize(Number(value))}>
                <SelectTrigger>
                    <SelectValue placeholder="Select page size">{String(pageSize)}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option} value={String(option)}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
