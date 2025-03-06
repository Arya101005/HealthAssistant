import React, { useState, useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Chip,
  Alert,
  Paper,
} from '@mui/material';
import { UploadFile, Analytics } from '@mui/icons-material';
import Tesseract from 'tesseract.js';

interface AnalysisResult {
  type: 'condition' | 'medication' | 'measurement' | 'recommendation';
  value: string;
  confidence: number;
}

export const MedicalReportScanner: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const processImage = useCallback(async (file: File) => {
    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      // Create preview URL
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);

      // Perform OCR
      const result = await Tesseract.recognize(file, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(m.progress * 100);
          }
        },
      });

      // Process the extracted text with NLP
      const analysisResults = await analyzeText(result.data.text);
      setResults(analysisResults);
    } catch (err) {
      console.error('Error processing medical report:', err);
      setError('Failed to process the medical report. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const analyzeText = async (text: string): Promise<AnalysisResult[]> => {
    try {
      const response = await fetch('/api/analyze-medical-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze the report');
      }

      const data = await response.json();
      return data.results;
    } catch (err) {
      console.error('Error analyzing text:', err);
      throw err;
    }
  };

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        processImage(file);
      } else {
        setError('Please upload an image or PDF file.');
      }
    }
  }, [processImage]);

  const getChipColor = (type: string) => {
    switch (type) {
      case 'condition':
        return 'error';
      case 'medication':
        return 'primary';
      case 'measurement':
        return 'info';
      case 'recommendation':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Medical Report Scanner
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Upload your medical reports for automatic analysis. Supports images and PDF files.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button
            variant="contained"
            component="label"
            startIcon={<UploadFile />}
            disabled={isProcessing}
          >
            Upload Report
            <input
              type="file"
              hidden
              accept="image/*,application/pdf"
              onChange={handleFileUpload}
            />
          </Button>
          {isProcessing && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={24} />
              <Typography variant="body2">
                Processing... {progress.toFixed(0)}%
              </Typography>
            </Box>
          )}
        </Box>

        {previewUrl && (
          <Paper
            sx={{
              mb: 3,
              p: 1,
              display: 'flex',
              justifyContent: 'center',
              bgcolor: 'background.default',
            }}
          >
            <img
              src={previewUrl}
              alt="Report preview"
              style={{
                maxWidth: '100%',
                maxHeight: '300px',
                objectFit: 'contain',
              }}
            />
          </Paper>
        )}

        {results.length > 0 && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Analytics />
              Analysis Results
            </Typography>
            <List>
              {results.map((result, index) => (
                <ListItem
                  key={index}
                  sx={{
                    bgcolor: 'background.paper',
                    mb: 1,
                    borderRadius: 1,
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                          label={result.type}
                          size="small"
                          color={getChipColor(result.type) as any}
                        />
                        <Typography variant="body1">{result.value}</Typography>
                      </Box>
                    }
                    secondary={`Confidence: ${(result.confidence * 100).toFixed(1)}%`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}; 