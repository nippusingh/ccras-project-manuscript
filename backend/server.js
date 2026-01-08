
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');
const manuscriptRoutes = require('./routes/manuscript.routes');
const approvalRoutes = require('./routes/approval.routes');
const apcRoutes = require('./routes/apc.routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/manuscripts', manuscriptRoutes);
app.use('/api/approvals', approvalRoutes);
app.use('/api/apc', apcRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`CCRAS Backend running on port ${PORT}`);
});
