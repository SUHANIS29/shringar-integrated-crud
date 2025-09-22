import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Gem, ShoppingCart, Heart, Star, Plus, Edit, Trash2 } from 'lucide-react';

interface JewelryItem {
  id: string;
  name: string;
  price: number;
  category: 'gold' | 'silver' | 'diamond' | 'precious-stones';
  weight: number;
  description: string;
  image?: string;
  inStock: boolean;
}

const mockJewelry: JewelryItem[] = [
  {
    id: '1',
    name: 'Gold Diamond Ring',
    price: 45000,
    category: 'gold',
    weight: 5.2,
    description: 'Beautiful 18k gold ring with premium diamond',
    inStock: true,
  },
  {
    id: '2',
    name: 'Silver Necklace Set',
    price: 8500,
    category: 'silver',
    weight: 12.5,
    description: 'Elegant silver necklace with matching earrings',
    inStock: true,
  },
  {
    id: '3',
    name: 'Emerald Pendant',
    price: 32000,
    category: 'precious-stones',
    weight: 3.8,
    description: 'Exquisite emerald pendant in gold setting',
    inStock: true,
  },
];

const Index = () => {
  const [items, setItems] = useLocalStorage<JewelryItem[]>('shringar_jewelry', mockJewelry);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<JewelryItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    category: 'gold' as JewelryItem['category'],
    weight: 0,
    description: '',
    inStock: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setItems(items.map(item => 
        item.id === editingItem.id 
          ? { ...formData, id: editingItem.id }
          : item
      ));
    } else {
      const newItem: JewelryItem = {
        ...formData,
        id: Date.now().toString(),
      };
      setItems([...items, newItem]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: 0,
      category: 'gold',
      weight: 0,
      description: '',
      inStock: true,
    });
    setEditingItem(null);
    setShowAddForm(false);
  };

  const handleEdit = (item: JewelryItem) => {
    setFormData({
      name: item.name,
      price: item.price,
      category: item.category,
      weight: item.weight,
      description: item.description,
      inStock: item.inStock,
    });
    setEditingItem(item);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="jewelry-hero text-white shadow-lg">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Gem className="h-12 w-12" />
              <h1 className="text-5xl font-bold">SHRINGAR</h1>
            </div>
            <p className="text-xl opacity-90 mb-8">Premium Jewelry Collection</p>
            <div className="flex justify-center gap-4">
              <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
                <DialogTrigger asChild>
                  <Button variant="jewelry" size="lg" className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add Items
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {editingItem ? 'Edit Jewelry Item' : 'Add New Jewelry Item'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Item Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Price (₹)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="weight">Weight (grams)</Label>
                        <Input
                          id="weight"
                          type="number"
                          step="0.1"
                          value={formData.weight}
                          onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value: JewelryItem['category']) =>
                          setFormData({ ...formData, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gold">Gold</SelectItem>
                          <SelectItem value="silver">Silver</SelectItem>
                          <SelectItem value="diamond">Diamond</SelectItem>
                          <SelectItem value="precious-stones">Precious Stones</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button type="submit" variant="hero">
                        {editingItem ? 'Update Item' : 'Add Item'}
                      </Button>
                      <Button type="button" onClick={resetForm} variant="outline">
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
              <Button variant="glass" size="lg" className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="product-card">
            <CardContent className="p-6 text-center">
              <Gem className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="text-2xl font-bold">{items.length}</h3>
              <p className="text-muted-foreground">Total Items</p>
            </CardContent>
          </Card>
          <Card className="product-card">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="text-2xl font-bold">{items.filter(item => item.category === 'gold').length}</h3>
              <p className="text-muted-foreground">Gold Items</p>
            </CardContent>
          </Card>
          <Card className="product-card">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="text-2xl font-bold">{items.filter(item => item.inStock).length}</h3>
              <p className="text-muted-foreground">In Stock</p>
            </CardContent>
          </Card>
        </div>

        {/* Jewelry Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="product-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <Badge variant="secondary" className="capitalize mt-1">
                      {item.category.replace('-', ' ')}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      onClick={() => handleEdit(item)}
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(item.id)}
                      variant="destructive"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-bold text-primary">₹{item.price.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground">{item.weight}g</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="hero" size="sm" className="flex-1">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
