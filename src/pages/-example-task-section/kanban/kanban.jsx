import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { NavLink } from "react-router-dom";
import { store } from "@/store";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import PersonIcon from "@mui/icons-material/Person";
import "./kanban.scss";

export const Kanban = () => {
  const option = store.use.option();
  const taskList = store.use.taskList();
  const items = store.use.tasks();
  const taskUpsert = store.use.taskUpsert();
  const [draggedTask, setDraggedTask] = useState(null);

  useEffect(() => {
    taskList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== newStatus) {
      const updatedTask = { ...draggedTask, status: newStatus };
      
      // When moving to "in progress" (status key = 1), 
      // the server will auto-assign the current user based on Windows authentication
      
      await taskUpsert(updatedTask);
      await taskList();
    }
    setDraggedTask(null);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const statuses = Array.isArray(option?.task?.status) ? option.task.status : [];
  const safeItems = Array.isArray(items) ? items.filter(Boolean) : [];

  if (isEmpty(safeItems) || isEmpty(statuses)) return <>Loading...</>;

  // Group tasks by status
  const tasksByStatus = {};
  statuses.forEach((status) => {
    tasksByStatus[status.key] = {
      text: status.text,
      tasks: safeItems.filter((task) => task?.status == status.key),
    };
  });

  return (
    <div className="kanban-container">
      <div className="kanban-board">
        {statuses.map((status) => (
          <Paper 
            key={status.key} 
            className="kanban-column" 
            elevation={0}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status.key)}
          >
            <Box className="kanban-column-header">
              <Typography variant="h6" component="h3">
                {status.text}
              </Typography>
              <Chip 
                label={tasksByStatus[status.key].tasks.length} 
                size="small"
                color="default"
              />
            </Box>
            <div className="kanban-column-content">
              {tasksByStatus[status.key].tasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                  onDragEnd={handleDragEnd}
                  style={{ cursor: 'grab' }}
                >
                  <NavLink
                    to={`/dev/tasks/${task.id}`}
                    style={{ textDecoration: 'none' }}
                    onClick={(e) => {
                      if (draggedTask) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <Card 
                      className="kanban-card"
                      variant="outlined"
                      sx={{
                        transition: 'all 0.2s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 3
                        }
                      }}
                    >
                    <CardContent sx={{ pb: 2, pt: 1.5, '&:last-child': { pb: 2 } }}>
                      <Typography 
                        variant="subtitle1" 
                        component="div" 
                        fontWeight={600}
                        mb={1}
                        color="text.primary"
                      >
                        {task.subject}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        mb={2}
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {task.body}
                      </Typography>
                      <Box 
                        display="flex" 
                        alignItems="center" 
                        justifyContent="space-between"
                        pt={1}
                        borderTop="1px solid"
                        borderColor="divider"
                      >
                        <Box display="flex" alignItems="center" gap={1}>
                          <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main' }}>
                            <PersonIcon sx={{ fontSize: 16 }} />
                          </Avatar>
                          <Typography variant="caption" color="text.secondary">
                            {task.userAssigned || "Unassigned"}
                          </Typography>
                        </Box>
                        <Chip 
                          label={`#${task.id}`} 
                          size="small" 
                          color="primary"
                          variant="outlined"
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </NavLink>
                </div>
              ))}
              {tasksByStatus[status.key].tasks.length === 0 && (
                <Box className="kanban-empty">
                  <Typography variant="body2" color="text.secondary" fontStyle="italic">
                    No tasks
                  </Typography>
                </Box>
              )}
            </div>
          </Paper>
        ))}
      </div>
    </div>
  );
};

export default Kanban;
