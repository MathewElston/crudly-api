// components/FormCard.js
import { Card, CardContent, CardHeader, Divider } from "@mui/material";

export default function FormCard({ title, children, actions, sx }) {
  return (
    <Card elevation={3} sx={{ borderRadius: 4, p: 2, ...sx }}>
      {title && <CardHeader title={title} />}
      <Divider />
      <CardContent>
        {children}
        {actions && (
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {actions}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
