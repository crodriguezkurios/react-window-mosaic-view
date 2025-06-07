
import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { 
  Paper, 
  Typography, 
  Box, 
  Chip, 
  Avatar,
  useTheme,
  alpha
} from '@mui/material';

interface TableData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  avatar: string;
  joinDate: string;
}

// Sample data
const generateSampleData = (count: number): TableData[] => {
  const roles = ['Admin', 'User', 'Moderator', 'Editor', 'Viewer'];
  const statuses: ('Active' | 'Inactive' | 'Pending')[] = ['Active', 'Inactive', 'Pending'];
  const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

  return Array.from({ length: count }, (_, index) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    
    return {
      id: index + 1,
      name,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      role: roles[Math.floor(Math.random() * roles.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`,
      joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString()
    };
  });
};

const data = generateSampleData(1000);

interface RowProps {
  index: number;
  style: React.CSSProperties;
}

const TableHeader: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '60px 200px 250px 120px 100px 120px',
        gap: 2,
        padding: '16px 24px',
        backgroundColor: alpha(theme.palette.primary.main, 0.05),
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        fontWeight: 600,
        fontSize: '0.875rem',
        color: theme.palette.text.secondary,
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}
    >
      <Typography variant="caption" fontWeight={600}>ID</Typography>
      <Typography variant="caption" fontWeight={600}>Name</Typography>
      <Typography variant="caption" fontWeight={600}>Email</Typography>
      <Typography variant="caption" fontWeight={600}>Role</Typography>
      <Typography variant="caption" fontWeight={600}>Status</Typography>
      <Typography variant="caption" fontWeight={600}>Join Date</Typography>
    </Box>
  );
};

const TableRow: React.FC<RowProps> = ({ index, style }) => {
  const theme = useTheme();
  const item = data[index];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Inactive': return 'error';
      case 'Pending': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box
      style={style}
      sx={{
        display: 'grid',
        gridTemplateColumns: '60px 200px 250px 120px 100px 120px',
        gap: 2,
        padding: '12px 24px',
        alignItems: 'center',
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.02),
        },
        transition: 'background-color 0.2s ease'
      }}
    >
      <Typography variant="body2" color="text.secondary" fontWeight={500}>
        #{item.id}
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar 
          src={item.avatar} 
          sx={{ width: 32, height: 32 }}
        />
        <Typography variant="body2" fontWeight={500}>
          {item.name}
        </Typography>
      </Box>
      
      <Typography variant="body2" color="text.secondary">
        {item.email}
      </Typography>
      
      <Typography variant="body2" fontWeight={500}>
        {item.role}
      </Typography>
      
      <Chip 
        label={item.status}
        color={getStatusColor(item.status) as any}
        size="small"
        sx={{ 
          fontWeight: 500,
          fontSize: '0.75rem'
        }}
      />
      
      <Typography variant="body2" color="text.secondary">
        {item.joinDate}
      </Typography>
    </Box>
  );
};

const VirtualizedTable: React.FC = () => {
  const theme = useTheme();

  return (
    <Paper 
      elevation={0}
      sx={{ 
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <TableHeader />
      <List
        height={600}
        itemCount={data.length}
        itemSize={64}
        width="100%"
      >
        {TableRow}
      </List>
    </Paper>
  );
};

export default VirtualizedTable;
