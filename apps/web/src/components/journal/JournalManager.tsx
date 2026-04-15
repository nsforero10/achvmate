"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { DashboardHeader } from "../habits/DashboardHeader";
import { PageLayout } from "../layout/PageLayout";
import { JournalModal, JournalFormData } from "./JournalModal";
import ReactMarkdown from "react-markdown";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useGetJournalEntriesQuery, useCreateJournalEntryMutation, useUpdateJournalEntryMutation } from "../../store/api";

interface JournalManagerProps {
  dateString: string;
}

export function JournalManager({ dateString }: JournalManagerProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const { data: entries = [], isLoading } = useGetJournalEntriesQuery();
  const [createJournal] = useCreateJournalEntryMutation();
  const [updateJournal] = useUpdateJournalEntryMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<any>(null);
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);

  const selectedEntry = entries.find((e: any) => e.id === selectedEntryId) || entries[0];

  const handleOpenNew = () => {
    setEditingEntry(null);
    setModalOpen(true);
  };

  const handleSubmit = async (data: JournalFormData) => {
    if (editingEntry) {
      await updateJournal({ id: editingEntry.id, data }).unwrap();
    } else {
      await createJournal(data).unwrap();
    }
    setModalOpen(false);
  };

  return (
    <>
      <PageLayout
        header={<DashboardHeader title="Daily Journal" dateString={dateString} greeting="" onOpenNew={handleOpenNew} actionLabel="New Diary Entry" />}
      >
        <Box sx={{ display: "flex", flexGrow: 1, gap: { xs: 2, md: 4 }, flexWrap: { xs: "wrap", md: "nowrap" } }}>
          
          {/* Left Pane - Entry List */}
          <Box sx={{ 
            width: { xs: "100%", md: 320 }, 
            display: "flex", 
            flexDirection: "column", 
            gap: 2, 
            overflowY: "auto", 
            pr: 1,
            maxHeight: { xs: 300, md: 'calc(100vh - 200px)' },
            flexShrink: 0
          }}>
            {isLoading && <Typography sx={{p: 2, fontWeight: 600, opacity: 0.5}}>Loading entries...</Typography>}
            
            {entries.length === 0 && !isLoading && (
              <Typography sx={{p: 2, fontWeight: 600, opacity: 0.5}}>No entries yet. Start writing!</Typography>
            )}

            {entries.map((entry: any) => {
              const isSelected = selectedEntry?.id === entry.id;
              const dateObj = new Date(entry.date);
              const fmtDate = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
              
              return (
                <Card 
                  key={entry.id} 
                  elevation={0}
                  sx={{ 
                    borderRadius: 4, 
                    border: isSelected ? "none" : (isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.05)"),
                    bgcolor: isSelected ? "text.primary" : "background.paper",
                    color: isSelected ? "background.paper" : "text.primary",
                    transition: "all 0.2s"
                  }}
                >
                  <CardActionArea onClick={() => setSelectedEntryId(entry.id)} sx={{ p: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Box sx={{ pr: 3 }}>
                        <Typography variant="overline" sx={{ opacity: 0.7, fontWeight: 800, display: 'block', mb: 0, textTransform: 'uppercase', letterSpacing: 1 }}>
                          {fmtDate}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 800, fontSize: 16 }}>
                          {entry.title}
                        </Typography>
                      </Box>
                      {isSelected && <ChevronRightIcon sx={{ color: "background.paper", alignSelf: "center", position: "absolute", right: 16 }} />}
                    </Box>
                  </CardActionArea>
                </Card>
              );
            })}
          </Box>

          {/* Right Pane - Selected Entry Viewer */}
          <Box sx={{ 
            flexGrow: 1, 
            bgcolor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)", 
            borderRadius: 6, 
            p: { xs: 3, md: 5 }, 
            overflowY: "auto",
            position: "relative",
            minHeight: { xs: 400, md: 'calc(100vh - 200px)' }
          }}>
            {selectedEntry ? (
              <Box sx={{ 
                  pb: 8, // Padding for Fab button
                  "& h1, & h2, & h3": { m: 0, mb: 1.5, fontWeight: 800, lineHeight: 1.2 },
                  "& h1": { fontSize: "2.5em", letterSpacing: "-0.02em" },
                  "& h2": { fontSize: "2em", letterSpacing: "-0.01em" },
                  "& h3": { fontSize: "1.5em" },
                  "& p": { my: 2.5, lineHeight: 1.7, fontSize: "1.1rem", opacity: 0.9 },
                  "& strong": { fontWeight: 800 },
                  "& code": { bgcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)", px: 1, py: 0.3, borderRadius: 1, fontFamily: "monospace" },
                  "& ul, & ol": { pl: 3 },
                  "& li": { mb: 1, fontSize: "1.1rem" }
                }}
              >
                <ReactMarkdown>{selectedEntry.content}</ReactMarkdown>
                <Fab 
                   color="primary" 
                   sx={{ position: "absolute", bottom: 32, right: 32 }}
                   onClick={() => {
                     setEditingEntry(selectedEntry);
                     setModalOpen(true);
                   }}
                >
                   <EditRoundedIcon />
                </Fab>
              </Box>
            ) : (
             <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                 <Typography variant="h6" fontWeight={600}>Select an entry to read</Typography>
             </Box>
            )}

          </Box>
        </Box>
      </PageLayout>

      {/* istanbul ignore next */}
      <JournalModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingEntry}
      />
    </>
  );
}
