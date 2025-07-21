
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  savings?: string;
  isPopular?: boolean;
  buttonText: string;
}

export const PricingPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const plans: PricingPlan[] = [
    {
      id: "monthly",
      name: "Monthly",
      price: 20,
      duration: "month",
      description: "Perfect for exploring our advanced analytics",
      features: [
        "Performance tracking",
        "Content analysis",
        "Hashtag optimization",
        "Competitor insights",
        "Basic trend reports",
      ],
      buttonText: "Subscribe"
    },
    {
      id: "semiannual",
      name: "6 Months",
      price: 100,
      duration: "6 months",
      description: "Great value for dedicated content creators",
      features: [
        "Everything in Monthly",
        "Advanced performance metrics",
        "Priority support",
        "Custom dashboard",
        "Weekly performance reports",
      ],
      savings: "Save $20",
      isPopular: true,
      buttonText: "Best Value"
    },
    {
      id: "annual",
      name: "Annual",
      price: 180,
      duration: "year",
      description: "Best deal for professional creators",
      features: [
        "Everything in 6 Months",
        "AI-powered recommendations",
        "Content strategy planning",
        "Unlimited analytics history",
        "Early access to new features",
      ],
      savings: "Save $60",
      buttonText: "Subscribe"
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    
    // Simulate subscription process
    setTimeout(() => {
      toast({
        title: "Subscription Successful!",
        description: `You've subscribed to the ${plans.find(p => p.id === planId)?.name} plan.`,
      });
    }, 1000);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan) => (
        <Card 
          key={plan.id} 
          className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
            plan.isPopular ? 'border-brand-purple dark:border-brand-purple-light border-2' : ''
          }`}
        >
          {plan.isPopular && (
            <div className="absolute top-0 right-0">
              <div className="bg-brand-purple dark:bg-brand-purple-light text-white px-3 py-1 text-xs font-medium">
                Popular
              </div>
            </div>
          )}
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">${plan.price}</span>
              <span className="text-sm text-muted-foreground ml-1">/{plan.duration}</span>
            </div>
            {plan.savings && (
              <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                {plan.savings}
              </div>
            )}
            <ul className="space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className={`w-full ${
                plan.isPopular 
                  ? 'bg-brand-purple hover:bg-brand-purple-dark dark:bg-brand-purple-light dark:hover:bg-brand-purple' 
                  : ''
              }`}
              onClick={() => handleSelectPlan(plan.id)}
              disabled={selectedPlan === plan.id}
            >
              {selectedPlan === plan.id ? "Processing..." : plan.buttonText}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
