"use client";

import { useState, useRef, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import ReactMarkdown from "react-markdown";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import CodeIcon from "@mui/icons-material/Code";
import LinkIcon from "@mui/icons-material/Link";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useTheme } from "@mui/material/styles";

export interface JournalFormData {
  title: string;
  content: string;
}

interface JournalModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: JournalFormData) => void;
  initialData?: JournalFormData | null;
}

export function JournalModal({ open, onClose, onSubmit, initialData }: JournalModalProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [formData, setFormData] = useState<JournalFormData>({ title: "", content: "" });
  const descriptionRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({ title: "", content: "" });
      }
    }
  }, [open, initialData]);

  const insertMarkdown = (prefix: string, suffix: string = "") => {
    const input = descriptionRef.current;
    if (!input) return;

    const start = input.selectionStart;
    const end = input.selectionEnd;
    if (start === null || end === null) return;

    const text = formData.content;
    const selectedText = text.substring(start, end);
    const newText = text.substring(0, start) + prefix + selectedText + suffix + text.substring(end);

    setFormData((prev) => ({ ...prev, content: newText }));

    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + prefix.length, end + Math.max(0, suffix.length));
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const toolbarBtnSx = { 
    bgcolor: isDark ? "rgba(255,255,255,0.05)" : "background.paper", 
    color: isDark ? "#fff" : "text.primary",
    boxShadow: isDark ? "none" : "0 2px 5px rgba(0,0,0,0.05)",
    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "none",
    "&:hover": { bgcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)" }
  };

  const inputBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          padding: 3,
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <DialogTitle sx={{ p: 0, fontWeight: 800, fontSize: '1.5rem' }}>
          {initialData ? "Edit Diary Entry" : "New Diary Entry"}
        </DialogTitle>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 0, pt: 1, overflowX: 'hidden' }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
            
            {/* Editor Column */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                fullWidth
                required
                size="medium"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                sx={{ "& .MuiOutlinedInput-root": { bgcolor: inputBg, borderRadius: 3, fontSize: '1.2rem', fontWeight: 600 } }}
              />

              <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                    <IconButton size="small" onClick={() => insertMarkdown("# ", "")} sx={toolbarBtnSx}><Typography sx={{fontWeight: 800, fontSize: 13}}>H1</Typography></IconButton>
                    <IconButton size="small" onClick={() => insertMarkdown("## ", "")} sx={toolbarBtnSx}><Typography sx={{fontWeight: 800, fontSize: 13}}>H2</Typography></IconButton>
                    <IconButton size="small" onClick={() => insertMarkdown("### ", "")} sx={toolbarBtnSx}><Typography sx={{fontWeight: 800, fontSize: 13}}>H3</Typography></IconButton>
                    <IconButton size="small" onClick={() => insertMarkdown("**", "**")} sx={{ ...toolbarBtnSx, ml: 1 }}><FormatBoldIcon fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={() => insertMarkdown("*", "*")} sx={toolbarBtnSx}><FormatItalicIcon fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={() => insertMarkdown("- ")} sx={{ ...toolbarBtnSx, ml: 1 }}><FormatListBulletedIcon fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={() => insertMarkdown("[", "](url)")} sx={toolbarBtnSx}><LinkIcon fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={() => insertMarkdown("`", "`")} sx={toolbarBtnSx}><CodeIcon fontSize="small" /></IconButton>
                </Box>
                
                <TextField
                  inputRef={descriptionRef}
                  fullWidth
                  multiline
                  minRows={14}
                  placeholder="What's on your mind today?"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  sx={{ flexGrow: 1, "& .MuiOutlinedInput-root": { height: "100%", alignItems: "flex-start", bgcolor: inputBg, borderRadius: 3 } }}
                />
              </Box>
            </Box>

            {/* Preview Column */}
            <Box sx={{ 
              flex: 1, 
              bgcolor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", 
              borderRadius: 3, 
              p: 3, 
              border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px dashed rgba(0,0,0,0.1)",
              minHeight: 400,
            }}>
              <Typography variant="overline" sx={{ opacity: 0.5, fontWeight: 800, letterSpacing: 1, display: 'block', mb: 2 }}>
                Live Preview
              </Typography>
              
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, letterSpacing: "-0.02em", color: formData.title ? 'text.primary' : 'text.disabled' }}>
                {formData.title || "Untitled Preview"}
              </Typography>

              <Box sx={{ 
                  "& h1, & h2, & h3": { m: 0, mb: 1.5, fontWeight: 800, lineHeight: 1.2 },
                  "& h1": { fontSize: "2.5em", letterSpacing: "-0.02em" },
                  "& h2": { fontSize: "2em", letterSpacing: "-0.01em" },
                  "& h3": { fontSize: "1.5em" },
                  "& p": { my: 2.5, lineHeight: 1.7, fontSize: "1.1rem", opacity: 0.9 },
                  "& strong": { fontWeight: 800 },
                  "& code": { bgcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)", px: 1, py: 0.3, borderRadius: 1, fontFamily: "monospace" },
                  "& ul, & ol": { pl: 3 },
                  "& li": { mb: 1, fontSize: "1.1rem", opacity: 0.9 }
                }}
              >
                <ReactMarkdown>{formData.content || "*Start typing to see the markdown formatting applied live...*"}</ReactMarkdown>
              </Box>
            </Box>

          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "text.primary",
              color: "background.paper",
              borderRadius: 8,
              py: 2,
              textTransform: "none",
              fontSize: 18,
              fontWeight: 800,
              mt: 4,
              "&:hover": { opacity: 0.9, bgcolor: "text.primary" },
            }}
          >
            {initialData ? "Save Config" : "Create"}
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  );
}
