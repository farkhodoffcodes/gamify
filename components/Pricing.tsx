import React from 'react';
import { VM_TIERS } from '../constants';
import { Check, Shield } from 'lucide-react';

export const Pricing: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-display font-bold text-white mb-4">Choose Your Power</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Select the virtual machine configuration that suits your gaming needs. Upgrade or downgrade anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {VM_TIERS.map((tier) => (
          <div 
            key={tier.id}
            className={`relative p-8 rounded-2xl border ${tier.id === 'pro' ? 'bg-slate-800 border-brand-500 shadow-[0_0_30px_rgba(0,242,234,0.15)]' : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'} flex flex-col transition-transform hover:-translate-y-2`}
          >
            {tier.id === 'pro' && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-500 to-blue-500 text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
            )}
            
            <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-display font-bold text-white">{tier.price}</span>
            </div>

            <div className="space-y-4 mb-8 flex-1">
              <div className={`p-3 rounded-lg ${tier.id === 'ultra' ? 'bg-accent-500/10 border border-accent-500/20' : 'bg-slate-800'}`}>
                <div className="text-xs text-slate-400 uppercase mb-1">GPU Power</div>
                <div className="font-bold text-white">{tier.gpu}</div>
              </div>
              
              {tier.features.map((feature, idx) => (
                <div key={idx} className="flex items-center text-slate-300 text-sm">
                  <Check className="w-4 h-4 text-brand-500 mr-3 shrink-0" />
                  {feature}
                </div>
              ))}
            </div>

            <button className={`w-full py-3 rounded-lg font-bold transition-all ${
              tier.id === 'free' 
                ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                : tier.id === 'pro'
                  ? 'bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-slate-900 shadow-lg'
                  : 'bg-gradient-to-r from-accent-500 to-purple-600 hover:from-accent-400 hover:to-purple-500 text-white shadow-lg'
            }`}>
              Select Plan
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-16 flex items-center justify-center space-x-2 text-slate-500 text-sm">
        <Shield className="w-4 h-4" />
        <span>Secure payment processed by Stripe. 30-day money-back guarantee on Pro and Ultra plans.</span>
      </div>
    </div>
  );
};