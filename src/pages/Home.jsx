import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect } from "react";
import { getUser } from "../data";
import { useState } from "react";

const USER_ID = "123456789";

export function Home({ navigate }) {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const personalData = [
    { label: "Nome", value: authenticatedUser?.firstName },
    { label: "Sobrenome", value: authenticatedUser?.lastName },
    { label: "Email", value: authenticatedUser?.email },
    { label: "Matrícula", value: authenticatedUser?.id },
    { label: "Telefone", value: authenticatedUser?.phone },
  ];

  useEffect(() => {
    getUser(USER_ID).then(setAuthenticatedUser);
  }, []);

  return (
    <Stack direction="column" alignItems="center" flex="1" spacing={3} height="100%" py={6}>
      <Stack width="100%" direction="row" alignItems="center" justifyContent="space-between">
        <Typography>👋 Bem-vindo {authenticatedUser?.email}!</Typography>
        <Button variant="text" size="small" onClick={() => navigate("classes")}>
          Notas e Faltas
        </Button>
      </Stack>
      <Typography variant="h2">Dados pessoais</Typography>

      <TableContainer>
        <Table>
          <TableBody>
            {personalData.map(({ label, value }) => (
              <TableRow key={label}>
                <TableCell>{label}</TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
