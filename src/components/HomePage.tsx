import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CrudTable } from '@/components/CrudTable';
import { ServiceForm } from '@/components/forms/ServiceForm';
import { ClientForm } from '@/components/forms/ClientForm';
import { Service, Client, Appointment, Staff } from '@/types/shringar';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { mockServices, mockClients, mockAppointments, mockStaff } from '@/data/mockData';
import { Scissors, Users, Calendar, TrendingUp, Star, Clock } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [services, setServices] = useLocalStorage<Service[]>('shringar_services', mockServices);
  const [clients, setClients] = useLocalStorage<Client[]>('shringar_clients', mockClients);
  const [appointments, setAppointments] = useLocalStorage<Appointment[]>('shringar_appointments', mockAppointments);
  const [staff, setStaff] = useLocalStorage<Staff[]>('shringar_staff', mockStaff);

  const [activeSection, setActiveSection] = useState<'overview' | 'services' | 'clients'>('overview');
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showClientForm, setShowClientForm] = useState(false);

  // Service CRUD operations
  const handleAddService = (serviceData: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...serviceData,
      id: Date.now().toString(),
    };
    setServices([...services, newService]);
    setShowServiceForm(false);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setShowServiceForm(true);
  };

  const handleUpdateService = (serviceData: Omit<Service, 'id'>) => {
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? { ...serviceData, id: editingService.id } : s));
      setEditingService(null);
      setShowServiceForm(false);
    }
  };

  const handleDeleteService = (service: Service) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(s => s.id !== service.id));
    }
  };

  // Client CRUD operations
  const handleAddClient = (clientData: Omit<Client, 'id' | 'totalVisits' | 'lastVisit'>) => {
    const newClient: Client = {
      ...clientData,
      id: Date.now().toString(),
      totalVisits: 0,
    };
    setClients([...clients, newClient]);
    setShowClientForm(false);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setShowClientForm(true);
  };

  const handleUpdateClient = (clientData: Omit<Client, 'id' | 'totalVisits' | 'lastVisit'>) => {
    if (editingClient) {
      setClients(clients.map(c => c.id === editingClient.id ? { 
        ...clientData, 
        id: editingClient.id,
        totalVisits: editingClient.totalVisits,
        lastVisit: editingClient.lastVisit
      } : c));
      setEditingClient(null);
      setShowClientForm(false);
    }
  };

  const handleDeleteClient = (client: Client) => {
    if (confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter(c => c.id !== client.id));
    }
  };

  const serviceColumns = [
    { key: 'name' as keyof Service, label: 'Service Name' },
    { 
      key: 'category' as keyof Service, 
      label: 'Category',
      render: (category: string) => (
        <Badge variant="secondary" className="capitalize">
          {category}
        </Badge>
      )
    },
    { 
      key: 'price' as keyof Service, 
      label: 'Price',
      render: (price: number) => `₹${price}`
    },
    { 
      key: 'duration' as keyof Service, 
      label: 'Duration',
      render: (duration: number) => `${duration} min`
    },
    { 
      key: 'available' as keyof Service, 
      label: 'Status',
      render: (available: boolean) => (
        <Badge variant={available ? "default" : "destructive"}>
          {available ? 'Available' : 'Unavailable'}
        </Badge>
      )
    },
  ];

  const clientColumns = [
    { key: 'name' as keyof Client, label: 'Name' },
    { key: 'email' as keyof Client, label: 'Email' },
    { key: 'phone' as keyof Client, label: 'Phone' },
    { 
      key: 'totalVisits' as keyof Client, 
      label: 'Total Visits',
      render: (visits: number) => (
        <Badge variant="outline">{visits} visits</Badge>
      )
    },
  ];

  const stats = [
    {
      title: 'Total Services',
      value: services.length,
      icon: Scissors,
      color: 'bg-gradient-primary',
    },
    {
      title: 'Active Clients',
      value: clients.length,
      icon: Users,
      color: 'bg-gradient-rose',
    },
    {
      title: 'Today\'s Appointments',
      value: appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length,
      icon: Calendar,
      color: 'bg-gradient-gold',
    },
    {
      title: 'Revenue This Month',
      value: `₹${appointments.reduce((total, apt) => total + apt.totalAmount, 0).toLocaleString()}`,
      icon: TrendingUp,
      color: 'bg-gradient-primary',
    },
  ];

  const renderOverview = () => (
    <div className="space-y-6 fade-in">
      {/* Welcome Section */}
      <div className="hero-section rounded-lg p-8 text-white">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold font-display mb-4">
            Welcome to Shringar Beauty Salon
          </h2>
          <p className="text-lg opacity-90 mb-6">
            Your complete beauty management solution. Manage services, clients, appointments, and staff all in one place.
          </p>
          <div className="flex gap-4">
            <Button 
              variant="glass" 
              size="lg"
              onClick={() => setActiveSection('services')}
            >
              <Scissors className="h-5 w-5 mr-2" />
              Manage Services
            </Button>
            <Button 
              variant="glass" 
              size="lg"
              onClick={() => setActiveSection('clients')}
            >
              <Users className="h-5 w-5 mr-2" />
              Manage Clients
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="service-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color} text-white`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Popular Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {services.slice(0, 3).map((service) => (
                <div key={service.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">₹{service.price}</p>
                  </div>
                  <Badge variant="secondary">{service.category}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {clients.slice(0, 3).map((client) => (
                <div key={client.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-muted-foreground">{client.email}</p>
                  </div>
                  <Badge variant="outline">{client.totalVisits} visits</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      {showServiceForm ? (
        <ServiceForm
          service={editingService || undefined}
          onSubmit={editingService ? handleUpdateService : handleAddService}
          onCancel={() => {
            setShowServiceForm(false);
            setEditingService(null);
          }}
        />
      ) : (
        <CrudTable
          title="Services Management"
          data={services}
          columns={serviceColumns}
          onAdd={() => setShowServiceForm(true)}
          onEdit={handleEditService}
          onDelete={handleDeleteService}
          addButtonLabel="Add New Service"
        />
      )}
    </div>
  );

  const renderClients = () => (
    <div className="space-y-6">
      {showClientForm ? (
        <ClientForm
          client={editingClient || undefined}
          onSubmit={editingClient ? handleUpdateClient : handleAddClient}
          onCancel={() => {
            setShowClientForm(false);
            setEditingClient(null);
          }}
        />
      ) : (
        <CrudTable
          title="Clients Management"
          data={clients}
          columns={clientColumns}
          onAdd={() => setShowClientForm(true)}
          onEdit={handleEditClient}
          onDelete={handleDeleteClient}
          addButtonLabel="Add New Client"
        />
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Quick Navigation */}
      <div className="flex gap-4 mb-6">
        <Button
          variant={activeSection === 'overview' ? 'hero' : 'outline'}
          onClick={() => setActiveSection('overview')}
        >
          Dashboard
        </Button>
        <Button
          variant={activeSection === 'services' ? 'hero' : 'outline'}
          onClick={() => setActiveSection('services')}
        >
          Services CRUD
        </Button>
        <Button
          variant={activeSection === 'clients' ? 'hero' : 'outline'}
          onClick={() => setActiveSection('clients')}
        >
          Clients CRUD
        </Button>
      </div>

      {/* Content */}
      {activeSection === 'overview' && renderOverview()}
      {activeSection === 'services' && renderServices()}
      {activeSection === 'clients' && renderClients()}
    </div>
  );
};