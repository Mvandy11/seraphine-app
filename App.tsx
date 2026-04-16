export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/oracle" element={<Oracle />} />
          <Route path="/manage" element={<ManageSubscription />} />
          <Route path="/subscribe" element={<Subscribe />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

