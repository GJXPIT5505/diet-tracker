"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: "male",
    age: "",
    weight: "", // kg
    height: "", // cm
    activity: "sedentary",
    goal: "maintain"
  });
  
  const [results, setResults] = useState<{bmi: number, bmr: number, tdee: number, target: number} | null>(null);

  const calculateNutrition = () => {
    const age = parseInt(formData.age);
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    
    // BMI
    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
    
    // BMR (Mifflin-St Jeor Equation)
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    if (formData.gender === "male") {
      bmr += 5;
    } else {
      bmr -= 161;
    }
    
    // TDEE
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };
    const tdee = bmr * activityMultipliers[formData.activity];
    
    // Target Calories
    let target = tdee;
    if (formData.goal === "lose_weight") target -= 500;
    if (formData.goal === "gain_muscle") target += 300;
    
    setResults({ bmi, bmr, tdee, target });
    setStep(2);
  };

  const handleSave = async () => {
    // Save to backend logic goes here
    alert("Data berhasil disimpan! (Simulasi API)");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-green-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Card className="w-full max-w-lg shadow-lg border-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm">
        {step === 1 && (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-green-700 dark:text-green-400">Profil Personal Anda</CardTitle>
              <CardDescription>Bantu kami menghitung kebutuhan nutrisi yang optimal dan aman untuk Anda.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Jenis Kelamin</Label>
                  <Select value={formData.gender} onValueChange={(v) => setFormData({...formData, gender: v})}>
                    <SelectTrigger><SelectValue placeholder="Pilih..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Laki-laki</SelectItem>
                      <SelectItem value="female">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Usia (Tahun)</Label>
                  <Input type="number" placeholder="25" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Berat Badan (kg)</Label>
                  <Input type="number" placeholder="70" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Tinggi Badan (cm)</Label>
                  <Input type="number" placeholder="170" value={formData.height} onChange={e => setFormData({...formData, height: e.target.value})} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Aktivitas Fisik</Label>
                <Select value={formData.activity} onValueChange={(v) => setFormData({...formData, activity: v})}>
                  <SelectTrigger><SelectValue placeholder="Pilih tingkat aktivitas..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sangat jarang olahraga (Duduk saja)</SelectItem>
                    <SelectItem value="light">Ringan (Olahraga 1-3 hari/minggu)</SelectItem>
                    <SelectItem value="moderate">Sedang (Olahraga 3-5 hari/minggu)</SelectItem>
                    <SelectItem value="active">Aktif (Olahraga keras 6-7 hari/minggu)</SelectItem>
                    <SelectItem value="very_active">Sangat Aktif (Atlet/Pekerjaan fisik berat)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Tujuan Diet</Label>
                <Select value={formData.goal} onValueChange={(v) => setFormData({...formData, goal: v})}>
                  <SelectTrigger><SelectValue placeholder="Apa tujuan Anda?" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose_weight">Menurunkan Berat Badan (-500 kkal)</SelectItem>
                    <SelectItem value="maintain">Menjaga Berat Badan</SelectItem>
                    <SelectItem value="gain_muscle">Menambah Massa Otot (+300 kkal)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={calculateNutrition} className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={!formData.age || !formData.weight || !formData.height}>
                Hitung Kebutuhan Saya
              </Button>
            </CardFooter>
          </>
        )}
        
        {step === 2 && results && (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-blue-700 dark:text-blue-400">Hasil Analisis Anda</CardTitle>
              <CardDescription>Ini adalah estimasi medis dasar untuk Anda.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center">
                  <div className="text-sm text-slate-500">BMI (Indeks Massa Tubuh)</div>
                  <div className="text-2xl font-bold">{results.bmi.toFixed(1)}</div>
                </div>
                <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl text-center">
                  <div className="text-sm text-slate-500">Target Kalori Harian</div>
                  <div className="text-2xl font-bold text-green-600">{Math.round(results.target)} <span className="text-sm font-normal text-slate-500">kkal</span></div>
                </div>
              </div>
              
              <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-900">
                <InfoIcon className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800 dark:text-blue-300">Catatan Kesehatan</AlertTitle>
                <AlertDescription className="text-blue-700 dark:text-blue-400 text-xs">
                  BMR Anda adalah {Math.round(results.bmr)} kkal (energi untuk tubuh beristirahat). 
                  TDEE Anda adalah {Math.round(results.tdee)} kkal (total energi terbakar harian). 
                  Target kalori ini telah disesuaikan dengan prinsip defisit/surplus kalori yang sehat.
                </AlertDescription>
              </Alert>

            </CardContent>
            <CardFooter className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(1)} className="w-full">
                Kembali
              </Button>
              <Button onClick={handleSave} className="w-full bg-green-600 hover:bg-green-700 text-white">
                Simpan & Lanjutkan
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}
