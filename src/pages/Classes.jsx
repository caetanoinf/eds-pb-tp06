import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect } from "react";
import { getUser } from "../data";
import { useState } from "react";

const USER_ID = "123456789";

export function Classes({ navigate }) {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const calculateAverage = (grades) => {
    return grades.reduce((acc, item) => acc + item.grade, 0) / grades.length;
  };

  useEffect(() => {
    getUser(USER_ID).then(setAuthenticatedUser);
  }, []);

  return (
    <Stack direction="column" alignItems="center" flex="1" spacing={3} height="100%" py={6}>
      <Stack width="100%" direction="row" alignItems="center" justifyContent="space-between">
        <Typography>👋 Bem-vindo {authenticatedUser?.email}!</Typography>
        <Button variant="text" size="small" onClick={() => navigate("home")}>
          Voltar
        </Button>
      </Stack>
      <Typography variant="h2">Notas e Faltas</Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Disciplina</TableCell>
              <TableCell sx={{ textAlign: "right" }}>Média</TableCell>
              <TableCell sx={{ textAlign: "right" }}>Faltas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authenticatedUser?.classes.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell sx={{ textAlign: "right" }}>{calculateAverage(item.grades).toFixed(2)}</TableCell>
                <TableCell sx={{ textAlign: "right" }}>{item.missedClasses}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
