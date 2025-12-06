"use client"

import { useState } from "react"
import { useAppStore } from "@/lib/app-context"
import { getTranslation } from "@/lib/i18n"

export default function WalletPage() {
  const { language } = useAppStore()
  const [activeModal, setActiveModal] = useState<"recharge" | "transfer" | "pay" | "qr" | null>(null)
  const [rechargeAmount, setRechargeAmount] = useState("")
  const [transferPhone, setTransferPhone] = useState("")
  const [transferAmount, setTransferAmount] = useState("")

  const t = (key: string) => getTranslation(key, language)

  const handleRecharge = () => {
    if (rechargeAmount) {
      console.log("Rechargement de", rechargeAmount, "MAD")
      setActiveModal(null)
      setRechargeAmount("")
    }
  }

  const handleTransfer = () => {
    if (transferPhone && transferAmount) {
      console.log("Transfert de", transferAmount, "à", transferPhone)
      setActiveModal(null)
      setTransferPhone("")
      setTransferAmount("")
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-md lg:max-w-2xl mx-auto">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{language === "fr" ? "Ma Portefeuille" : "محفظتي"}</h1>

      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white mb-8 shadow-lg">
        <p className="text-sm opacity-90 mb-2">{language === "fr" ? "Solde actuel" : "الرصيد الحالي"}</p>
        <h2 className="text-3xl font-bold mb-4">2 350,00 MAD</h2>
        <div className="space-y-1 text-xs opacity-90">
          <p>{language === "fr" ? "Compte CIH Care" : "حساب CIH Care"}</p>
          <p>CNT-2024-001</p>
        </div>
      </div>

      {/* Actions Section */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {language === "fr" ? "Actions e-wallet" : "إجراءات المحفظة"}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Recharge Button */}
          <button
            onClick={() => setActiveModal("recharge")}
            className="bg-white border-2 border-blue-500 rounded-lg p-4 text-center hover:bg-blue-50 transition-colors"
          >
            <span className="text-3xl mb-2 block">💰</span>
            <p className="text-sm font-medium text-gray-900">{language === "fr" ? "Recharger" : "شحن"}</p>
          </button>

          {/* Transfer Button */}
          <button
            onClick={() => setActiveModal("transfer")}
            className="bg-white border-2 border-blue-500 rounded-lg p-4 text-center hover:bg-blue-50 transition-colors"
          >
            <span className="text-3xl mb-2 block">💸</span>
            <p className="text-sm font-medium text-gray-900">{language === "fr" ? "Envoyer" : "إرسال"}</p>
          </button>

          {/* Pay Button */}
          <button
            onClick={() => setActiveModal("pay")}
            className="bg-white border-2 border-blue-500 rounded-lg p-4 text-center hover:bg-blue-50 transition-colors"
          >
            <span className="text-3xl mb-2 block">🏥</span>
            <p className="text-sm font-medium text-gray-900">{language === "fr" ? "Payer" : "الدفع"}</p>
          </button>

          {/* QR Code Button */}
          <button
            onClick={() => setActiveModal("qr")}
            className="bg-white border-2 border-blue-500 rounded-lg p-4 text-center hover:bg-blue-50 transition-colors"
          >
            <span className="text-3xl mb-2 block">📱</span>
            <p className="text-sm font-medium text-gray-900">{language === "fr" ? "QR Code" : "رمز QR"}</p>
          </button>
        </div>
      </div>

      {/* Modal Overlays */}
      {activeModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white w-full md:max-w-md rounded-t-2xl md:rounded-2xl p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Recharge Modal */}
            {activeModal === "recharge" && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {language === "fr" ? "Recharger votre portefeuille" : "شحن محفظتك"}
                </h2>
                <div className="space-y-4">
                  <input
                    type="number"
                    placeholder={language === "fr" ? "Montant (MAD)" : "المبلغ (درهم)"}
                    value={rechargeAmount}
                    onChange={(e) => setRechargeAmount(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    <option>{language === "fr" ? "Carte bancaire" : "بطاقة بنكية"}</option>
                    <option>{language === "fr" ? "Guichet" : "كاونتر"}</option>
                    <option>{language === "fr" ? "Virement" : "تحويل"}</option>
                  </select>
                  <button onClick={handleRecharge} className="w-full cih-btn-primary">
                    {language === "fr" ? "Recharger" : "شحن"}
                  </button>
                </div>
              </>
            )}

            {/* Transfer Modal */}
            {activeModal === "transfer" && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {language === "fr" ? "Envoyer de l'argent" : "إرسال أموال"}
                </h2>
                <div className="space-y-4">
                  <input
                    type="tel"
                    placeholder={language === "fr" ? "Numéro de téléphone" : "رقم الهاتف"}
                    value={transferPhone}
                    onChange={(e) => setTransferPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder={language === "fr" ? "Montant (MAD)" : "المبلغ (درهم)"}
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <button onClick={handleTransfer} className="w-full cih-btn-primary">
                    {language === "fr" ? "Envoyer" : "إرسال"}
                  </button>
                </div>
              </>
            )}

            {/* Pay Modal */}
            {activeModal === "pay" && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {language === "fr" ? "Payer un bénéficiaire" : "الدفع للمستفيد"}
                </h2>
                <div className="space-y-4">
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    <option>{language === "fr" ? "Clinique Moderne" : "العيادة الحديثة"}</option>
                    <option>{language === "fr" ? "Pharmacie Al-Noor" : "صيدلية النور"}</option>
                    <option>{language === "fr" ? "Pompes Funèbres" : "دار التشييع"}</option>
                  </select>
                  <input
                    type="number"
                    placeholder={language === "fr" ? "Montant (MAD)" : "المبلغ (درهم)"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <button className="w-full cih-btn-primary">
                    {language === "fr" ? "Valider le paiement" : "تأكيد الدفع"}
                  </button>
                </div>
              </>
            )}

            {/* QR Code Modal */}
            {activeModal === "qr" && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {language === "fr" ? "Mon RIB & QR Code" : "حسابي ورمز QR"}
                </h2>
                <div className="space-y-4 text-center">
                  <div className="bg-gray-100 rounded-lg p-6 aspect-square flex items-center justify-center text-6xl">
                    📱
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600 mb-2">{language === "fr" ? "RIB" : "الحساب"}:</p>
                    <p className="font-mono text-sm font-bold">BMCE 123 456 789</p>
                  </div>
                  <button className="w-full cih-btn-primary">
                    {language === "fr" ? "Télécharger le QR Code" : "تحميل رمز QR"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
