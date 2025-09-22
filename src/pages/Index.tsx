import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/components/HomePage';
import { TabsContent } from '@/components/ui/tabs';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      <TabsContent value="home">
        <HomePage />
      </TabsContent>
      
      <TabsContent value="services">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold font-display mb-4">Services Tab</h2>
          <p className="text-muted-foreground">Services management is integrated in the Home tab CRUD section.</p>
        </div>
      </TabsContent>
      
      <TabsContent value="clients">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold font-display mb-4">Clients Tab</h2>
          <p className="text-muted-foreground">Clients management is integrated in the Home tab CRUD section.</p>
        </div>
      </TabsContent>
      
      <TabsContent value="appointments">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold font-display mb-4">Appointments Tab</h2>
          <p className="text-muted-foreground">Appointments management can be added here or integrated in the Home tab.</p>
        </div>
      </TabsContent>
      
      <TabsContent value="staff">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold font-display mb-4">Staff Tab</h2>
          <p className="text-muted-foreground">Staff management can be added here or integrated in the Home tab.</p>
        </div>
      </TabsContent>
    </Layout>
  );
};

export default Index;
