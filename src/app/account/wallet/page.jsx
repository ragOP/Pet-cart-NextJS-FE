"use client";

import React, { useState } from "react";
import RequireAuth from "@/components/auth/RequireAuth";
import { useQuery } from "@tanstack/react-query";
import { getWalletTransactions } from "@/app/apis/getWalletTransactions";
import { checkUserWallet } from "@/app/apis/checkUserWallet";
import PrimaryLoader from "@/components/loaders/PrimaryLoader";
import PrimaryEmptyState from "@/components/empty-states/PrimaryEmptyState";
import { Wallet, ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import "@/styles/hide-scrollbar.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "@/store/authSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function WalletPage() {
    const [page, setPage] = useState(1);
    const perPage = 10;
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const router = useRouter();

    // Fetch wallet info (balance)
    const {
        data: walletInfo,
        isLoading: isLoadingWallet,
        refetch: refetchWallet,
        isFetching: isFetchingWallet,
    } = useQuery({
        queryKey: ["user-wallet"],
        queryFn: checkUserWallet,
        select: (res) => res?.data || {},
        onSuccess: (data) => {
            // Update Redux with wallet balance
            if (data?.walletBalance !== undefined && user) {
                const updatedUser = {
                    ...user,
                    walletBalance: data.walletBalance,
                };
                dispatch(setUser(updatedUser));
            }
        },
    });

    // Fetch wallet transactions
    const {
        data: walletData = {},
        isLoading: isLoadingTransactions,
        isError,
        refetch: refetchTransactions,
        isFetching: isFetchingTransactions,
    } = useQuery({
        queryKey: ["wallet-transactions", page, perPage],
        queryFn: () => getWalletTransactions({ page, perPage }),
        select: (res) => res?.data || { transactions: [], total: 0 },
    });

    const handleRefresh = async () => {
        await Promise.all([refetchWallet(), refetchTransactions()]);
        toast.success("Wallet updated successfully!", {
            position: "top-right",
            duration: 1500,
        });
    };

    const handleOrderIdClick = (orderId) => {
        router.push(`/account/orders?orderId=${orderId}`);
    };

    const transactions = walletData?.data || [];
    const totalTransactions = walletData?.total || 0;
    const walletBalance = walletInfo?.walletBalance ?? user?.walletBalance ?? 0;
    const totalPages = Math.ceil(totalTransactions / perPage);
    const isLoading = isLoadingWallet || isLoadingTransactions;
    const isRefreshing = (isFetchingWallet || isFetchingTransactions) && !isLoading;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getTransactionIcon = (type) => {
        return type === "credit" ? (
            <ArrowDownRight className="w-5 h-5 text-green-600" />
        ) : (
            <ArrowUpRight className="w-5 h-5 text-red-600" />
        );
    };

    const getTransactionColor = (type) => {
        return type === "credit" ? "text-green-600" : "text-red-600";
    };

    return (
        <RequireAuth>
            <div className="bg-white border border-[#F59A1180] h-[80vh] overflow-y-auto rounded-lg shadow-sm hide-scrollbar">
                {/* Header */}
                <div className="px-4 lg:px-6 py-4 border-b border-[#F59A1180]">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 flex items-center gap-2">
                            <Wallet className="w-6 h-6 text-[#F59A11]" />
                            My Wallet
                        </h1>
                        <button
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                            className="bg-[#F59A11] hover:bg-[#E08900] text-white px-3 lg:px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                            <span className="hidden sm:inline">Refresh</span>
                        </button>
                    </div>

                    {/* Wallet Balance Card */}
                    <div className="bg-gradient-to-r from-[#F59A11] to-[#E08900] rounded-xl p-4 lg:p-6 text-white">
                        <p className="text-sm opacity-90 mb-1">Available Balance</p>
                        {isLoading ? (
                            <div className="h-10 lg:h-12 bg-white/20 rounded-lg animate-pulse w-48"></div>
                        ) : (
                            <p className="text-3xl lg:text-4xl font-bold">₹{walletBalance.toFixed(2)}</p>
                        )}
                    </div>
                </div>

                {/* Transactions List */}
                <div className="p-4 lg:p-6">
                    <h2 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">
                        Transaction History ({totalTransactions || 0})
                    </h2>

                    {isFetchingTransactions ? (
                        <div className="space-y-3">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div key={index} className="bg-[#F59A110D] rounded-lg p-4 border border-gray-100">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex gap-3 flex-1">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse flex-shrink-0"></div>
                                            <div className="flex-1 min-w-0 space-y-2">
                                                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                                                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                                                <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
                                            </div>
                                        </div>
                                        <div className="text-right flex-shrink-0 space-y-2">
                                            <div className="h-5 bg-gray-200 rounded animate-pulse w-20"></div>
                                            <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : isError ? (
                        <PrimaryEmptyState title="Failed to load transactions" />
                    ) : transactions.length === 0 ? (
                        <div className="flex justify-center items-center py-20">
                            <PrimaryEmptyState title="No transactions yet" />
                        </div>
                    ) : (
                        <>
                            <div className="space-y-3">
                                {transactions.map((transaction) => (
                                    <div
                                        key={transaction._id}
                                        className="bg-[#F59A110D] rounded-lg p-4 hover:bg-gray-50 transition-colors border border-gray-100"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            {/* Transaction Icon and Details */}
                                            <div className="flex gap-3 flex-1">
                                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                                                    {getTransactionIcon(transaction.type)}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 mb-1">
                                                        {transaction.description || transaction.type}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {formatDate(transaction.createdAt)}
                                                    </p>
                                                    {transaction.orderId && (
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Order ID:{" "}
                                                            <span 
                                                                className="text-blue-600 hover:text-blue-800 cursor-pointer font-mono underline decoration-dotted underline-offset-2"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleOrderIdClick(transaction.orderId);
                                                                }}
                                                            >
                                                                #{transaction.orderId}
                                                            </span>
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Amount */}
                                            <div className="text-right flex-shrink-0">
                                                <p
                                                    className={`text-base lg:text-lg font-bold ${getTransactionColor(
                                                        transaction.type
                                                    )}`}
                                                >
                                                    {transaction.type === "credit" ? "+" : "-"}₹
                                                    {transaction.amount.toFixed(2)}
                                                </p>
                                                {transaction.status && (
                                                    <p className="text-xs text-gray-500 mt-1 capitalize">
                                                        {transaction.status}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center mt-6">
                                    <Pagination>
                                        <PaginationContent className="flex-wrap gap-1">
                                            <PaginationPrevious
                                                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                                                className="text-xs sm:text-sm cursor-pointer"
                                                disabled={page === 1}
                                            />
                                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                let pageNumber;

                                                if (totalPages <= 5) {
                                                    pageNumber = i + 1;
                                                } else {
                                                    if (page <= 3) {
                                                        pageNumber = i + 1;
                                                    } else if (page >= totalPages - 2) {
                                                        pageNumber = totalPages - 4 + i;
                                                    } else {
                                                        pageNumber = page - 2 + i;
                                                    }
                                                }

                                                return (
                                                    <PaginationItem key={pageNumber}>
                                                        <PaginationLink
                                                            isActive={pageNumber === page}
                                                            onClick={() => setPage(pageNumber)}
                                                            className="text-xs sm:text-sm w-8 h-8 sm:w-10 sm:h-10 cursor-pointer"
                                                        >
                                                            {pageNumber}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                );
                                            })}
                                            <PaginationNext
                                                onClick={() =>
                                                    setPage((prev) => Math.min(totalPages, prev + 1))
                                                }
                                                className="text-xs sm:text-sm cursor-pointer"
                                                disabled={page === totalPages}
                                            />
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </RequireAuth>
    );
}

