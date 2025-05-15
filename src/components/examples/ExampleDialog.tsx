
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, X, AlertTriangle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const ExampleDialog = () => {
  const [dialogState, setDialogState] = useState<'form' | 'success' | 'error'>('form');
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setDialogState(Math.random() > 0.5 ? 'success' : 'error');
    }
  };

  const resetDialog = () => {
    setDialogState('form');
    setName('');
    setEmail('');
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Open Dialog</Button>
        </DialogTrigger>

        {dialogState === 'form' && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Subscribe to Newsletter</DialogTitle>
              <DialogDescription>
                Enter your information below to subscribe to our newsletter.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="John Doe" 
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="john@example.com" 
                  required
                />
              </div>
              <DialogFooter className="mt-4">
                <Button type="submit">Subscribe</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        )}

        {dialogState === 'success' && (
          <DialogContent className="sm:max-w-[425px]">
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="mb-4 rounded-full bg-green-100 p-3">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <DialogTitle className="mb-2">Subscription Successful</DialogTitle>
              <DialogDescription className="mb-6">
                Thank you for subscribing to our newsletter. You'll start receiving updates soon.
              </DialogDescription>
              <Button onClick={resetDialog}>Close</Button>
            </div>
          </DialogContent>
        )}

        {dialogState === 'error' && (
          <DialogContent className="sm:max-w-[425px]">
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="mb-4 rounded-full bg-primary p-3">
                <AlertTriangle className="h-6 w-6 text-light" />
              </div>
              <DialogTitle className="mb-2">Subscription Failed</DialogTitle>
              <DialogDescription className="mb-6">
                There was an error processing your subscription. Please try again later.
              </DialogDescription>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setDialogState('form')}>Try Again</Button>
                <Button onClick={resetDialog}>Close</Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Additional button to demonstrate error state */}
      <Button 
        variant="outline"
        onClick={() => {
          setDialogState('error');
          setOpen(true);
        }}
      >
        Show Error Dialog
      </Button>
      
      {/* Additional button to demonstrate success state */}
      <Button 
        variant="secondary"
        onClick={() => {
          setDialogState('success');
          setOpen(true);
        }}
      >
        Show Success Dialog
      </Button>
    </div>
  );
};

export default ExampleDialog;
