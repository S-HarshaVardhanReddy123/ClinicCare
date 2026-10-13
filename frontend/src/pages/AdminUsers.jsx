import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import "./AdminUsers.css";

const AdminUsers = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("ALL");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [selectedUser, setSelectedUser] = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [updatingUserId, setUpdatingUserId] = useState(null);

    // ============================================================
    // FETCH USERS
    // ============================================================

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                "/admin/users"
            );

            console.log(
                "Admin users response:",
                response.data
            );

            const userData =
                response.data?.users ||
                response.data?.data ||
                [];

            setUsers(
                Array.isArray(userData)
                    ? userData
                    : []
            );
        } catch (err) {
            console.error(
                "Admin users error:",
                err
            );

            setUsers([]);

            setError(
                err.response?.data?.message ||
                "Failed to load users."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    // ============================================================
    // LOGOUT
    // ============================================================

    const handleLogout = () => {
        logout();

        navigate(
            "/login",
            {
                replace: true,
            }
        );
    };


    // ============================================================
    // VIEW USER DETAILS
    // ============================================================

    const handleViewUser = async (userId) => {
        try {
            setDetailsLoading(true);
            setSelectedUser(null);

            const response = await api.get(
                `/admin/users/${userId}`
            );

            setSelectedUser(
                response.data?.user ||
                response.data?.data ||
                null
            );
        } catch (err) {
            console.error(
                "Get user details error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to load user details."
            );
        } finally {
            setDetailsLoading(false);
        }
    };


    // ============================================================
    // UPDATE USER STATUS
    // ============================================================

    const handleStatusChange = async (
        user
    ) => {
        const nextStatus =
            !Boolean(user.is_active);

        const actionText = nextStatus
            ? "activate"
            : "deactivate";

        const confirmed = window.confirm(
            `Are you sure you want to ${actionText} ${user.name}?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setUpdatingUserId(user.id);

            const response =
                await api.patch(
                    `/admin/users/${user.id}/status`,
                    {
                        is_active: nextStatus,
                    }
                );

            if (response.data?.success) {
                await fetchUsers();

                if (
                    selectedUser &&
                    selectedUser.id === user.id
                ) {
                    setSelectedUser(
                        (current) =>
                            current
                                ? {
                                      ...current,
                                      is_active:
                                          nextStatus,
                                  }
                                : current
                    );
                }
            } else {
                setError(
                    response.data?.message ||
                    "Failed to update user status."
                );
            }
        } catch (err) {
            console.error(
                "Update user status error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to update user status."
            );
        } finally {
            setUpdatingUserId(null);
        }
    };


    // ============================================================
    // FILTER USERS
    // ============================================================

    const filteredUsers = users.filter(
        (user) => {
            const searchText =
                search
                    .trim()
                    .toLowerCase();

            const matchesSearch =
                !searchText ||
                String(user.name || "")
                    .toLowerCase()
                    .includes(searchText) ||
                String(user.email || "")
                    .toLowerCase()
                    .includes(searchText) ||
                String(user.phone || "")
                    .toLowerCase()
                    .includes(searchText);

            const matchesRole =
                roleFilter === "ALL" ||
                user.role === roleFilter;

            const matchesStatus =
                statusFilter === "ALL" ||
                (statusFilter === "ACTIVE" &&
                    Boolean(user.is_active)) ||
                (statusFilter === "INACTIVE" &&
                    !Boolean(user.is_active));

            return (
                matchesSearch &&
                matchesRole &&
                matchesStatus
            );
        }
    );


    // ============================================================
    // COUNTS
    // ============================================================

    const totalUsers = users.length;

    const activeUsers = users.filter(
        (user) => Boolean(user.is_active)
    ).length;

    const inactiveUsers = users.filter(
        (user) => !Boolean(user.is_active)
    ).length;

    const patientUsers = users.filter(
        (user) => user.role === "PATIENT"
    ).length;

    const doctorUsers = users.filter(
        (user) => user.role === "DOCTOR"
    ).length;

    const adminUsers = users.filter(
        (user) => user.role === "ADMIN"
    ).length;


    // ============================================================
    // ROLE LABEL
    // ============================================================

    const roleLabel = (role) => {
        if (role === "PATIENT") {
            return "Patient";
        }

        if (role === "DOCTOR") {
            return "Doctor";
        }

        if (role === "ADMIN") {
            return "Admin";
        }

        return role || "Unknown";
    };


    // ============================================================
    // DATE FORMAT
    // ============================================================

    const formatDate = (date) => {
        if (!date) {
            return "—";
        }

        const parsedDate =
            new Date(date);

        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {
            return "—";
        }

        return parsedDate.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };


    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {
        return (
            <div className="admin-users-page">

                <div className="admin-users-loading">

                    <div className="admin-users-spinner"></div>

                    <p>
                        Loading users...
                    </p>

                </div>

            </div>
        );
    }


    // ============================================================
    // PAGE
    // ============================================================

    return (
        <div className="admin-users-page">

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="admin-users-header">

                <div>

                    <span className="admin-users-label">
                        ADMIN PANEL
                    </span>

                    <h1>
                        Manage Users
                    </h1>

                    <p>
                        View and manage ClinicCare
                        patient, doctor and admin
                        accounts.
                    </p>

                </div>


                <div className="admin-users-actions">

                    <button
                        type="button"
                        className="admin-users-refresh"
                        onClick={fetchUsers}
                    >
                        ↻ Refresh
                    </button>

                    <button
                        type="button"
                        className="admin-users-logout"
                        onClick={handleLogout}
                    >
                        🚪 Logout
                    </button>

                </div>

            </div>


            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (
                <div className="admin-users-error">

                    <span>
                        {error}
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            setError("")
                        }
                    >
                        ×
                    </button>

                </div>
            )}


            {/* ==================================================
                SUMMARY CARDS
            ================================================== */}

            <div className="admin-users-summary">

                <div className="admin-users-summary-card">

                    <div className="admin-users-summary-icon">
                        👥
                    </div>

                    <div>

                        <span>
                            Total Users
                        </span>

                        <strong>
                            {totalUsers.toLocaleString(
                                "en-IN"
                            )}
                        </strong>

                    </div>

                </div>


                <div className="admin-users-summary-card">

                    <div className="admin-users-summary-icon">
                        🟢
                    </div>

                    <div>

                        <span>
                            Active
                        </span>

                        <strong>
                            {activeUsers.toLocaleString(
                                "en-IN"
                            )}
                        </strong>

                    </div>

                </div>


                <div className="admin-users-summary-card">

                    <div className="admin-users-summary-icon">
                        ⚪
                    </div>

                    <div>

                        <span>
                            Inactive
                        </span>

                        <strong>
                            {inactiveUsers.toLocaleString(
                                "en-IN"
                            )}
                        </strong>

                    </div>

                </div>


                <div className="admin-users-summary-card">

                    <div className="admin-users-summary-icon">
                        🧑
                    </div>

                    <div>

                        <span>
                            Patients
                        </span>

                        <strong>
                            {patientUsers.toLocaleString(
                                "en-IN"
                            )}
                        </strong>

                    </div>

                </div>


                <div className="admin-users-summary-card">

                    <div className="admin-users-summary-icon">
                        🩺
                    </div>

                    <div>

                        <span>
                            Doctors
                        </span>

                        <strong>
                            {doctorUsers.toLocaleString(
                                "en-IN"
                            )}
                        </strong>

                    </div>

                </div>


                <div className="admin-users-summary-card">

                    <div className="admin-users-summary-icon">
                        🛡️
                    </div>

                    <div>

                        <span>
                            Admins
                        </span>

                        <strong>
                            {adminUsers.toLocaleString(
                                "en-IN"
                            )}
                        </strong>

                    </div>

                </div>

            </div>


            {/* ==================================================
                FILTERS
            ================================================== */}

            <div className="admin-users-filters">

                <div className="admin-users-search">

                    <span>
                        🔍
                    </span>

                    <input
                        type="text"
                        placeholder="Search by name, email or phone..."
                        value={search}
                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }
                    />

                </div>


                <select
                    value={roleFilter}
                    onChange={(event) =>
                        setRoleFilter(
                            event.target.value
                        )
                    }
                    className="admin-users-select"
                >
                    <option value="ALL">
                        All Roles
                    </option>

                    <option value="PATIENT">
                        Patients
                    </option>

                    <option value="DOCTOR">
                        Doctors
                    </option>

                    <option value="ADMIN">
                        Admins
                    </option>
                </select>


                <select
                    value={statusFilter}
                    onChange={(event) =>
                        setStatusFilter(
                            event.target.value
                        )
                    }
                    className="admin-users-select"
                >
                    <option value="ALL">
                        All Status
                    </option>

                    <option value="ACTIVE">
                        Active
                    </option>

                    <option value="INACTIVE">
                        Inactive
                    </option>
                </select>

            </div>


            {/* ==================================================
                TABLE
            ================================================== */}

            <div className="admin-users-table-card">

                <div className="admin-users-table-header">

                    <div>

                        <h2>
                            Users
                        </h2>

                        <p>
                            Showing{" "}
                            <strong>
                                {filteredUsers.length}
                            </strong>{" "}
                            of{" "}
                            <strong>
                                {users.length}
                            </strong>{" "}
                            users
                        </p>

                    </div>

                </div>


                {filteredUsers.length === 0 ? (

                    <div className="admin-users-empty">

                        <div>
                            🔍
                        </div>

                        <h3>
                            No users found
                        </h3>

                        <p>
                            Try changing your
                            search or filters.
                        </p>

                    </div>

                ) : (

                    <div className="admin-users-table-wrapper">

                        <table className="admin-users-table">

                            <thead>

                                <tr>

                                    <th>
                                        ID
                                    </th>

                                    <th>
                                        User
                                    </th>

                                    <th>
                                        Phone
                                    </th>

                                    <th>
                                        Role
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Created
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredUsers.map(
                                    (user) => (
                                        <tr
                                            key={
                                                user.id
                                            }
                                        >

                                            <td>
                                                <span className="admin-user-id">
                                                    #
                                                    {
                                                        user.id
                                                    }
                                                </span>
                                            </td>


                                            <td>

                                                <div className="admin-user-info">

                                                    <div className="admin-user-avatar">
                                                        {String(
                                                            user.name ||
                                                            "U"
                                                        )
                                                            .charAt(
                                                                0
                                                            )
                                                            .toUpperCase()}
                                                    </div>

                                                    <div>

                                                        <strong>
                                                            {
                                                                user.name
                                                            }
                                                        </strong>

                                                        <span>
                                                            {
                                                                user.email
                                                            }
                                                        </span>

                                                    </div>

                                                </div>

                                            </td>


                                            <td>
                                                {
                                                    user.phone ||
                                                    "—"
                                                }
                                            </td>


                                            <td>

                                                <span
                                                    className={`admin-role-badge ${String(
                                                        user.role ||
                                                        ""
                                                    ).toLowerCase()}`}
                                                >
                                                    {
                                                        roleLabel(
                                                            user.role
                                                        )
                                                    }
                                                </span>

                                            </td>


                                            <td>

                                                <span
                                                    className={`admin-user-status ${
                                                        user.is_active
                                                            ? "active"
                                                            : "inactive"
                                                    }`}
                                                >
                                                    <span>
                                                        ●
                                                    </span>

                                                    {user.is_active
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>

                                            </td>


                                            <td>
                                                {formatDate(
                                                    user.created_at
                                                )}
                                            </td>


                                            <td>

                                                <div className="admin-user-actions">

                                                    <button
                                                        type="button"
                                                        className="admin-view-user-button"
                                                        onClick={() =>
                                                            handleViewUser(
                                                                user.id
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </button>


                                                    <button
                                                        type="button"
                                                        className={
                                                            user.is_active
                                                                ? "admin-deactivate-button"
                                                                : "admin-activate-button"
                                                        }
                                                        disabled={
                                                            updatingUserId ===
                                                            user.id
                                                        }
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                user
                                                            )
                                                        }
                                                    >
                                                        {updatingUserId ===
                                                        user.id
                                                            ? "Updating..."
                                                            : user.is_active
                                                            ? "Deactivate"
                                                            : "Activate"}
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>
                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>


            {/* ==================================================
                USER DETAILS MODAL
            ================================================== */}

            {(detailsLoading ||
                selectedUser) && (

                <div
                    className="admin-user-modal-overlay"
                    onClick={() => {
                        if (
                            !detailsLoading
                        ) {
                            setSelectedUser(
                                null
                            );
                        }
                    }}
                >

                    <div
                        className="admin-user-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        {detailsLoading ? (

                            <div className="admin-user-modal-loading">

                                <div className="admin-users-spinner"></div>

                                <p>
                                    Loading user
                                    details...
                                </p>

                            </div>

                        ) : (

                            <>
                                <div className="admin-user-modal-header">

                                    <div>

                                        <span>
                                            USER DETAILS
                                        </span>

                                        <h2>
                                            {selectedUser?.name ||
                                                "User"}
                                        </h2>

                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedUser(
                                                null
                                            )
                                        }
                                        className="admin-user-modal-close"
                                    >
                                        ×
                                    </button>

                                </div>


                                <div className="admin-user-modal-body">

                                    <div className="admin-user-detail-avatar">
                                        {String(
                                            selectedUser?.name ||
                                            "U"
                                        )
                                            .charAt(
                                                0
                                            )
                                            .toUpperCase()}
                                    </div>


                                    <div className="admin-user-detail-grid">

                                        <div>
                                            <span>
                                                Name
                                            </span>

                                            <strong>
                                                {
                                                    selectedUser?.name ||
                                                    "—"
                                                }
                                            </strong>
                                        </div>


                                        <div>
                                            <span>
                                                Email
                                            </span>

                                            <strong>
                                                {
                                                    selectedUser?.email ||
                                                    "—"
                                                }
                                            </strong>
                                        </div>


                                        <div>
                                            <span>
                                                Phone
                                            </span>

                                            <strong>
                                                {
                                                    selectedUser?.phone ||
                                                    "—"
                                                }
                                            </strong>
                                        </div>


                                        <div>
                                            <span>
                                                Role
                                            </span>

                                            <strong>
                                                {roleLabel(
                                                    selectedUser?.role
                                                )}
                                            </strong>
                                        </div>


                                        <div>
                                            <span>
                                                Status
                                            </span>

                                            <strong>
                                                {selectedUser?.is_active
                                                    ? "Active"
                                                    : "Inactive"}
                                            </strong>
                                        </div>


                                        <div>
                                            <span>
                                                User ID
                                            </span>

                                            <strong>
                                                #
                                                {
                                                    selectedUser?.id
                                                }
                                            </strong>
                                        </div>


                                        <div>
                                            <span>
                                                Created
                                            </span>

                                            <strong>
                                                {formatDate(
                                                    selectedUser?.created_at
                                                )}
                                            </strong>
                                        </div>


                                        <div>
                                            <span>
                                                Updated
                                            </span>

                                            <strong>
                                                {formatDate(
                                                    selectedUser?.updated_at
                                                )}
                                            </strong>
                                        </div>

                                    </div>

                                </div>


                                <div className="admin-user-modal-footer">

                                    <button
                                        type="button"
                                        className="admin-user-modal-cancel"
                                        onClick={() =>
                                            setSelectedUser(
                                                null
                                            )
                                        }
                                    >
                                        Close
                                    </button>

                                </div>
                            </>

                        )}

                    </div>

                </div>

            )}

        </div>
    );
};

export default AdminUsers;