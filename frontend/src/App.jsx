import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, TextField, Button, Box, Paper, CircularProgress, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import config from './config';
import './App.css';

function App() {
  const [brief, setBrief] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [proposal, setProposal] = useState('');
  const [loading, setLoading] = useState(false);

  const generateProposal = async () => {
    setLoading(true);
    const res = await fetch(`${config.API_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientBrief: brief, portfolio }),
    });
    const data = await res.json();
    setProposal(data.proposal);
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(proposal);
    alert('Copied to clipboard!');
  };

  const exportPDF = async () => {
    const html2pdf = (await import('html2pdf.js')).default;
    const element = document.getElementById('proposal-output');
    if (element) html2pdf().from(element).save('proposal.pdf');
  };

  return (
    <Box sx={{ bgcolor: '#f5f6fa', minHeight: '100vh' }}>
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1 }}>
            🚀 Auto Proposal Generator
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Enter Client Brief
          </Typography>
          <TextField
            label="Client Brief"
            placeholder="Describe the client's needs..."
            multiline
            minRows={3}
            fullWidth
            margin="normal"
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
          />
          <Typography variant="h6" gutterBottom fontWeight={600} sx={{ mt: 3 }}>
            Your Portfolio Summary
          </Typography>
          <TextField
            label="Portfolio Summary"
            placeholder="Paste your portfolio summary..."
            multiline
            minRows={3}
            fullWidth
            margin="normal"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
          />
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={generateProposal}
              disabled={loading}
              size="large"
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Proposal'}
            </Button>
          </Box>
          {proposal && (
            <Paper elevation={2} sx={{ mt: 5, p: 3, bgcolor: '#f0f4ff' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Generated Proposal
                </Typography>
                <Tooltip title="Copy to Clipboard">
                  <IconButton color="primary" onClick={copyToClipboard}>
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Export as PDF">
                  <IconButton color="secondary" onClick={exportPDF}>
                    <PictureAsPdfIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box id="proposal-output" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: 16 }}>
                {proposal}
              </Box>
            </Paper>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
