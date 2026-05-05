import { useState, useMemo } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DataGrid } from '@mui/x-data-grid';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const initialUsers = [
  { id: 1, firstName: 'JB',       lastName: 'Nativdad', age: '20', gender: 'male', contactNumber: '09171234561', email: 'jb.nativdad@webprog.dev',       role: 'admin',  username: 'jbnativdad',      password: 'Password1!', address: 'Manila, Metro Manila', isActive: true  },
  { id: 2, firstName: 'Mac',      lastName: 'Iguiron',  age: '20', gender: 'male', contactNumber: '09171234562', email: 'mac.iguiron@webprog.dev',       role: 'editor', username: 'maciguiron',      password: 'Password1!', address: 'Manila, Metro Manila', isActive: true  },
  { id: 3, firstName: 'Shem',     lastName: 'Naranjo',  age: '21', gender: 'male', contactNumber: '09171234563', email: 'shem.naranjo@webprog.dev',      role: 'viewer', username: 'shemnaranjo',     password: 'Password1!', address: 'Manila, Metro Manila', isActive: true  },
  { id: 4, firstName: 'Vergel',   lastName: 'Santiago', age: '20', gender: 'male', contactNumber: '09171234564', email: 'vergel.santiago@webprog.dev',   role: 'viewer', username: 'vergelsantiago',  password: 'Password1!', address: 'Manila, Metro Manila', isActive: true  },
  { id: 5, firstName: 'Marius',   lastName: 'Panahon',  age: '20', gender: 'male', contactNumber: '09171234565', email: 'marius.panahon@webprog.dev',    role: 'editor', username: 'mariuspanahon',   password: 'Password1!', address: 'Manila, Metro Manila', isActive: true  },
  { id: 6, firstName: '',         lastName: 'Regodon',  age: '20', gender: 'male', contactNumber: '09171234566', email: 'regodon@webprog.dev',           role: 'viewer', username: 'regodon',         password: 'Password1!', address: 'Manila, Metro Manila', isActive: false },
  { id: 7, firstName: 'Rhoedney', lastName: 'Reillo',   age: '24', gender: 'male', contactNumber: '09171234567', email: 'rhoedney.reillo@webprog.dev',   role: 'viewer', username: 'rhoedneyreillo',  password: 'Password1!', address: 'Manila, Metro Manila', isActive: true  },
  { id: 8, firstName: 'Joshua',   lastName: 'Braza',    age: '36', gender: 'male', contactNumber: '09171234568', email: 'joshua.braza@webprog.dev',      role: 'editor', username: 'joshuabraza',     password: 'Password1!', address: 'Manila, Metro Manila', isActive: true  },
  { id: 9, firstName: 'Jed',      lastName: 'Ramos',    age: '65', gender: 'male', contactNumber: '09171234569', email: 'jed.ramos@webprog.dev',         role: 'admin',  username: 'jedramos',        password: 'Password1!', address: 'Manila, Metro Manila', isActive: false },
];

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  role: 'editor',
  username: '',
  password: '',
  address: '',
  isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [users, setUsers] = useState(initialUsers);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState({ ...blankForm });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Enhancement 2 — search & filter state
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterGender, setFilterGender] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredUsers = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter((u) => {
      const matchSearch =
        !q ||
        u.firstName.toLowerCase().includes(q) ||
        u.lastName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q);
      const matchRole = filterRole === 'all' || u.role === filterRole;
      const matchGender = filterGender === 'all' || u.gender === filterGender;
      const matchStatus =
        filterStatus === 'all' ||
        (filterStatus === 'active' ? u.isActive : !u.isActive);
      return matchSearch && matchRole && matchGender && matchStatus;
    });
  }, [users, search, filterRole, filterGender, filterStatus]);

  const columnVisibilityModel = useMemo(() => {
    if (isMobile) return { id: false, age: false, gender: false, contactNumber: false, email: false };
    if (isTablet) return { age: false, gender: false, contactNumber: false };
    return {};
  }, [isMobile, isTablet]);

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const openModal = (user) => {
    setModal({ open: true, id: user ? (user.id ?? null) : null });
    setForm(user ? { ...blankForm, ...user } : { ...blankForm });
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    const mustEmail = form.email.trim().toLowerCase();
    const username = form.username.trim().toLowerCase();

    [
      ['firstName', 'First name'],
      ['lastName', 'Last name'],
      ['age', 'Age'],
      ['gender', 'Gender'],
      ['contactNumber', 'Contact number'],
      ['email', 'Email'],
      ['role', 'Role'],
      ['username', 'Username'],
      ['password', 'Password'],
      ['address', 'Address'],
    ].forEach(([key, label]) => {
      if (!form[key] && key !== 'isActive') {
        nextErrors[key] = `${label} is required`;
      }
    });

    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mustEmail)) {
      nextErrors.email = 'Enter a valid email address';
    }

    if (
      !nextErrors.email &&
      users.some((u) => u.id !== modal.id && u.email === mustEmail)
    ) {
      nextErrors.email = 'Email address already exists.';
    }

    if (
      !nextErrors.username &&
      users.some((u) => u.id !== modal.id && u.username === username)
    ) {
      nextErrors.username = 'Username already exists.';
    }

    // Enhancement 3 — beginner-friendly validation rules
    if (!nextErrors.password && form.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters';
    }

    if (!nextErrors.contactNumber && !/^\d{11}$/.test(form.contactNumber)) {
      nextErrors.contactNumber = 'Contact number must be exactly 11 digits';
    }

    if (!nextErrors.age && !/^\d+$/.test(form.age.trim())) {
      nextErrors.age = 'Age must be a number only';
    }

    if (!nextErrors.username && /\s/.test(form.username)) {
      nextErrors.username = 'Username must not contain spaces';
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const nextUser = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age.trim(),
      gender: form.gender,
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(),
      password: form.password,
      address: form.address.trim(),
      isActive: form.isActive,
    };

    setUsers((prev) =>
      modal.id
        ? prev.map((user) =>
            user.id === modal.id ? { ...user, ...nextUser } : user
          )
        : [
            ...prev,
            {
              id:
                prev.reduce(
                  (max, user) => Math.max(max, Number(user.id) || 0),
                  0
                ) + 1,
              ...nextUser,
            },
          ]
    );

    closeModal();
  };

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'firstName',
      headerName: 'Full Name',
      minWidth: 170,
      valueGetter: (value, row) => `${row.firstName} ${row.lastName}`.trim(),
    },
    { field: 'username', headerName: 'Username', minWidth: 130 },
    { field: 'age', headerName: 'Age', width: 80 },
    {
      field: 'gender',
      headerName: 'Gender',
      minWidth: 110,
      valueGetter: (value, row) => labelize(row.gender),
    },
    { field: 'contactNumber', headerName: 'Contact Number', minWidth: 150 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 150 },
    {
      field: 'role',
      headerName: 'Role',
      minWidth: 110,
      valueGetter: (value, row) => labelize(row.role),
    },
    {
      field: 'isActive',
      headerName: 'Status',
      minWidth: 120,
      sortable: false,
      renderCell: (cell) => (
        <Chip
          size="small"
          variant="outlined"
          color={cell.row.isActive ? 'success' : 'warning'}
          label={cell.row.isActive ? 'Active' : 'Inactive'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 210,
      sortable: false,
      filterable: false,
      renderCell: (cell) => (
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          sx={{ py: 0.5 }}
        >
          <Button
            size="small"
            variant="outlined"
            color="warning"
            onClick={() => openModal(cell.row)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={cell.row.isActive ? 'warning' : 'success'}
            onClick={() => toggleStatus(cell.row.id)}
          >
            {cell.row.isActive ? 'Disable' : 'Activate'}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      {/* Header */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h4">Users</Typography>
        <Button
          variant="contained"
          onClick={() => openModal()}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Add User
        </Button>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 1.5, sm: 2 },
          minWidth: 0,
          overflow: 'auto',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
        }}
      >
        {/* Enhancement 2 — Search & Filter Row */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ mb: 2 }}
          flexWrap="wrap"
          useFlexGap
        >
          <TextField
            size="small"
            placeholder="Search by name, email, or username…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 2, minWidth: 200 }}
          />
          <TextField
            select
            size="small"
            label="Role"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            sx={{ flex: 1, minWidth: 120 }}
          >
            <MenuItem value="all">All Roles</MenuItem>
            {roles.map((r) => (
              <MenuItem key={r} value={r}>
                {labelize(r)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            size="small"
            label="Gender"
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
            sx={{ flex: 1, minWidth: 120 }}
          >
            <MenuItem value="all">All Genders</MenuItem>
            {genders.map((g) => (
              <MenuItem key={g} value={g}>
                {labelize(g)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            size="small"
            label="Status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            sx={{ flex: 1, minWidth: 120 }}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
        </Stack>

        <Box sx={{ width: '100%', minWidth: 0 }}>
          <DataGrid
            rows={filteredUsers}
            columns={columns}
            autoHeight
            disableRowSelectionOnClick
            checkboxSelection
            columnVisibilityModel={columnVisibilityModel}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5, page: 0 } },
            }}
            sx={{
              border: 'none',
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'rgba(122,47,59,0.05)',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: 'rgba(122,47,59,0.03)',
              },
              '& .MuiDataGrid-row.Mui-selected': {
                backgroundColor: 'rgba(122,47,59,0.08)',
                '&:hover': { backgroundColor: 'rgba(122,47,59,0.10)' },
              },
              '& .MuiDataGrid-cell:focus': { outline: 'none' },
              '& .MuiCheckbox-root.Mui-checked': { color: 'primary.main' },
            }}
          />
        </Box>
      </Paper>

      {/* Add / Edit User Dialog */}
      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? 'Edit User' : 'Add User'}</DialogTitle>
          <DialogContent dividers sx={{ pt: 2 }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('firstName', 'First Name')} />
                <TextField {...fieldProps('lastName', 'Last Name')} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('age', 'Age')} />
                <TextField
                  {...fieldProps('gender', 'Gender', { select: true })}
                >
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {labelize(gender)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('contactNumber', 'Contact Number')} />
                <TextField
                  {...fieldProps('email', 'Email Address', { type: 'email' })}
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('role', 'Role', { select: true })}>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField {...fieldProps('username', 'Username')} />
              </Stack>
              <TextField
                {...fieldProps('password', 'Password', {
                  type: showPassword ? 'text' : 'password',
                  slotProps: {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword((prev) => !prev)}
                            onMouseDown={(event) => event.preventDefault()}
                            aria-label={
                              showPassword ? 'Hide password' : 'Show password'
                            }
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  },
                })}
              />
              <TextField
                {...fieldProps('address', 'Address', {
                  multiline: true,
                  rows: 3,
                })}
              />
              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                  />
                }
                label={
                  form.isActive
                    ? 'User status: Active'
                    : 'User status: Inactive'
                }
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ py: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              {modal.id ? 'Update User' : 'Save User'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
