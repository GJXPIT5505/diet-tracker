"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CameraIcon, PlusIcon, Loader2, UtensilsIcon } from "lucide-react";
import { toast } from "sonner";

export default function FoodLogPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [manualEntry, setManualEntry] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: ""
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        scanFood(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const scanFood = async (base64Image: string) => {
    setIsScanning(true);
    // Simulasi fetch API ke /api/upload -> Gemini Vision
    try {
      // Mocking AI response
      await new Promise(r => setTimeout(r, 2000));
      
      setManualEntry({
        name: "Ayam Bakar & Nasi Merah",
        calories: "450",
        protein: "35",
        carbs: "40",
        fat: "10"
      });
      toast.success("AI berhasil mendeteksi makanan Anda!");
    } catch (e) {
      toast.error("Gagal mendeteksi makanan.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleSubmit = () => {
    if (!manualEntry.name || !manualEntry.calories) {
      toast.error("Nama makanan dan Kalori harus diisi!");
      return;
    }
    toast.success(`${manualEntry.name} berhasil ditambahkan ke log harian Anda!`);
    
    // Reset
    setImagePreview(null);
    setManualEntry({ name: "", calories: "", protein: "", carbs: "", fat: "" });
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <UtensilsIcon className="text-green-600" /> Jurnal Makanan
          </h1>
        </div>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>AI Food Scanner</CardTitle>
            <CardDescription>Upload foto makanan Anda, biar AI yang menghitung kalorinya.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {imagePreview ? (
              <div className="relative w-full h-48 rounded-xl overflow-hidden border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                {isScanning && (
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white backdrop-blur-sm">
                    <Loader2 className="h-8 w-8 animate-spin mb-2" />
                    <span className="font-medium">Menganalisis Makanan...</span>
                  </div>
                )}
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-500">
                  <CameraIcon className="w-10 h-10 mb-3 text-green-500" />
                  <p className="mb-2 text-sm"><span className="font-semibold">Klik untuk upload</span> foto</p>
                  <p className="text-xs">PNG, JPG, JPEG (Max. 5MB)</p>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Rincian Makanan</CardTitle>
            <CardDescription>Anda juga bisa mengisi atau mengedit rincian ini secara manual.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nama Makanan</Label>
              <Input placeholder="Cth: Nasi Goreng Spesial" value={manualEntry.name} onChange={e => setManualEntry({...manualEntry, name: e.target.value})} disabled={isScanning} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Total Kalori (kkal)</Label>
                <Input type="number" placeholder="400" value={manualEntry.calories} onChange={e => setManualEntry({...manualEntry, calories: e.target.value})} disabled={isScanning} />
              </div>
              <div className="space-y-2">
                <Label>Protein (g)</Label>
                <Input type="number" placeholder="20" value={manualEntry.protein} onChange={e => setManualEntry({...manualEntry, protein: e.target.value})} disabled={isScanning} />
              </div>
              <div className="space-y-2">
                <Label>Karbohidrat (g)</Label>
                <Input type="number" placeholder="50" value={manualEntry.carbs} onChange={e => setManualEntry({...manualEntry, carbs: e.target.value})} disabled={isScanning} />
              </div>
              <div className="space-y-2">
                <Label>Lemak (g)</Label>
                <Input type="number" placeholder="10" value={manualEntry.fat} onChange={e => setManualEntry({...manualEntry, fat: e.target.value})} disabled={isScanning} />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={isScanning}>
              <PlusIcon className="w-4 h-4 mr-2" /> Simpan Makanan
            </Button>
          </CardFooter>
        </Card>

      </div>
    </div>
  );
}
