import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Users, MessageCircle } from 'lucide-react';

const Pricing: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentStage, setCurrentStage] = useState('country');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');

  const paymentMethods = {
    egypt: {
      'mobile-wallet': {
        title: 'محفظة هاتف',
        amount: '1000 جنيه مصري',
        number: '0100000000',
        wallets: ['فودافون كاش', 'أورانج كاش', 'اتصالات كاش']
      },
      'instapay': {
        title: 'إنستاباي',
        amount: '1000 جنيه مصري',
        account: 'HossamAI@instapay'
      }
    },
    international: {
      'bank-transfer': {
        title: 'تحويل بنكي',
        amount: '$50 USD',
        details: {
          name: 'Ahmed Ahmed Ahmed Ahmed',
          bank: 'CIB',
          account: '1080808080808080',
          swift: '7070x'
        }
      },
      'payeer': {
        title: 'Payeer',
        amount: '$50 USD',
        account: 'HelloMan@xxx.com'
      }
    }
  };

  const handleStageChange = (stage: string, value?: string) => {
    if (stage === 'payment' && value) {
      setSelectedCountry(value);
      setCurrentStage('payment');
    } else if (stage === 'details' && value) {
      setSelectedPayment(value);
      setCurrentStage('details');
    } else {
      setCurrentStage(stage);
    }
  };

  const resetModal = () => {
    setCurrentStage('country');
    setSelectedCountry('');
    setSelectedPayment('');
    setShowModal(false);
  };

  const renderPaymentDetails = () => {
    const method = paymentMethods[selectedCountry as keyof typeof paymentMethods]?.[selectedPayment as keyof typeof paymentMethods.egypt];
    if (!method) return null;

    return (
      <div className="text-center space-y-6">
        <h3 className="text-xl font-bold text-indigo-400">{method.title}</h3>
        <p className="text-slate-300">
          من فضلك قم بتحويل مبلغ <span className="font-bold">{method.amount}</span>
        </p>
        
        {selectedPayment === 'mobile-wallet' && (
          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-lg">
              <p className="text-2xl font-mono text-white">{method.number}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {method.wallets?.map((wallet, index) => (
                <span key={index} className="bg-slate-700 px-3 py-1 rounded-full text-sm">
                  {wallet}
                </span>
              ))}
            </div>
          </div>
        )}

        {selectedPayment === 'instapay' && (
          <div className="bg-slate-900 p-4 rounded-lg">
            <p className="text-xl font-mono text-white">{method.account}</p>
          </div>
        )}

        {selectedPayment === 'bank-transfer' && method.details && (
          <div className="bg-slate-900 p-6 rounded-lg text-right space-y-2">
            <p><span className="text-slate-400">Name:</span> <span className="text-white">{method.details.name}</span></p>
            <p><span className="text-slate-400">Bank:</span> <span className="text-white">{method.details.bank}</span></p>
            <p><span className="text-slate-400">Account:</span> <span className="text-white font-mono">{method.details.account}</span></p>
            <p><span className="text-slate-400">Swift:</span> <span className="text-white font-mono">{method.details.swift}</span></p>
          </div>
        )}

        {selectedPayment === 'payeer' && (
          <div className="bg-slate-900 p-4 rounded-lg">
            <p className="text-xl font-mono text-white">{method.account}</p>
          </div>
        )}

        <p className="text-slate-400 text-sm">
          بعد التحويل، أرسل صورة من الإيصال على تليجرام لتفعيل اشتراكك.
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="hero-gradient-text">اختر الباقة المناسبة لك</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            انضم لمجتمعنا وابدأ رحلتك في عالم الذكاء الاصطناعي اليوم
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card text-center"
          >
            <div className="mb-6">
              <Users className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-cyan-400 mb-2">العضوية المجانية</h3>
              <p className="text-slate-400">انضم لمجتمعنا على تليجرام</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span>نقاشات عامة ومصادر مفيدة</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span>إعلانات عن الكورسات الجديدة</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span>نصائح وحيل مجانية</span>
              </div>
            </div>

            <a
              href="https://t.me/+WrGesCy1dh83MGU0"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 block text-center"
            >
              انضم مجاناً
            </a>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative bg-gradient-to-br from-indigo-900/50 to-purple-900/50 p-8 rounded-xl border-2 border-indigo-500 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
          >
            <div className="absolute -top-4 right-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-bold px-4 py-2 rounded-full">
              الأكثر شيوعاً
            </div>

            <div className="text-center mb-6">
              <Star className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-indigo-400 mb-2">العضوية الإحترافية (Pro)</h3>
              <div className="text-5xl font-bold mb-2">
                $50 <span className="text-lg font-normal text-slate-400">/ مرة واحدة فقط</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span>وصول كامل لكل الفيديوهات</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span>تحديثات مستمرة ومحتوى حصري</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span>جروب تليجرام خاص بالأعضاء (VIP)</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span>دعم مباشر للإجابة على أسئلتك</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span>شهادة إتمام معتمدة</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span>مشاريع عملية وتطبيقية</span>
              </div>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="w-full btn-primary"
            >
              اشترك الآن
            </button>
          </motion.div>
        </div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12">مقارنة الباقات</h2>
          <div className="glass-effect rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/50">
                  <tr>
                    <th className="text-right p-4 font-bold">الميزة</th>
                    <th className="text-center p-4 font-bold text-cyan-400">مجاني</th>
                    <th className="text-center p-4 font-bold text-indigo-400">Pro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  <tr>
                    <td className="p-4">الوصول للمجتمع</td>
                    <td className="text-center p-4"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                    <td className="text-center p-4"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4">المحتوى المجاني</td>
                    <td className="text-center p-4"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                    <td className="text-center p-4"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4">جميع الكورسات</td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4">المجتمع الخاص (VIP)</td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4">الدعم المباشر</td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4">الشهادات</td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12">الأسئلة الشائعة</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: 'هل يمكنني الترقية من المجاني إلى Pro؟',
                answer: 'نعم، يمكنك الترقية في أي وقت والاستفادة من جميع المزايا الإضافية.'
              },
              {
                question: 'هل هناك ضمان استرداد؟',
                answer: 'نعم، نوفر ضمان استرداد لمدة 30 يوم إذا لم تكن راضياً عن المحتوى.'
              },
              {
                question: 'كم مدة صلاحية الاشتراك؟',
                answer: 'الاشتراك Pro مدى الحياة، تدفع مرة واحدة وتحصل على الوصول الدائم.'
              },
              {
                question: 'هل المحتوى باللغة العربية؟',
                answer: 'نعم، جميع الكورسات والشروحات باللغة العربية مع أمثلة عملية.'
              }
            ].map((faq, index) => (
              <div key={index} className="card">
                <h3 className="font-bold mb-2">{faq.question}</h3>
                <p className="text-slate-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Subscription Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg m-4 p-8 relative">
            <button
              onClick={resetModal}
              className="absolute top-4 left-4 text-slate-400 hover:text-white"
            >
              <i className="fas fa-times text-xl"></i>
            </button>

            {currentStage !== 'country' && (
              <button
                onClick={() => {
                  if (currentStage === 'payment') {
                    setCurrentStage('country');
                  } else if (currentStage === 'details') {
                    setCurrentStage('payment');
                  }
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <i className="fas fa-arrow-right text-xl"></i>
              </button>
            )}

            <h2 className="text-2xl font-bold text-center mb-6">إتمام الاشتراك (Pro)</h2>

            {currentStage === 'country' && (
              <div>
                <p className="text-center text-slate-400 mb-6">أولاً، اختر بلدك للمتابعة.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleStageChange('payment', 'egypt')}
                    className="bg-slate-700 hover:bg-indigo-600 p-4 rounded-lg text-lg font-bold transition-colors"
                  >
                    مصر
                  </button>
                  <button
                    onClick={() => handleStageChange('payment', 'international')}
                    className="bg-slate-700 hover:bg-pink-600 p-4 rounded-lg text-lg font-bold transition-colors"
                  >
                    دولي
                  </button>
                </div>
              </div>
            )}

            {currentStage === 'payment' && (
              <div>
                <p className="text-center text-slate-400 mb-6">
                  اختر طريقة الدفع المفضلة {selectedCountry === 'egypt' ? 'داخل مصر' : 'من خارج مصر'}.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCountry === 'egypt' ? (
                    <>
                      <button
                        onClick={() => handleStageChange('details', 'mobile-wallet')}
                        className="bg-slate-700 hover:bg-slate-600 p-4 rounded-lg text-lg font-bold transition-colors"
                      >
                        محفظة هاتف
                      </button>
                      <button
                        onClick={() => handleStageChange('details', 'instapay')}
                        className="bg-slate-700 hover:bg-slate-600 p-4 rounded-lg text-lg font-bold transition-colors"
                      >
                        إنستاباي
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleStageChange('details', 'bank-transfer')}
                        className="bg-slate-700 hover:bg-slate-600 p-4 rounded-lg text-lg font-bold transition-colors"
                      >
                        تحويل بنكي
                      </button>
                      <button
                        onClick={() => handleStageChange('details', 'payeer')}
                        className="bg-slate-700 hover:bg-slate-600 p-4 rounded-lg text-lg font-bold transition-colors"
                      >
                        Payeer
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {currentStage === 'details' && renderPaymentDetails()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;