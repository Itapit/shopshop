export const orderFeatureKey = 'order';

export interface OrderState {
  saving: boolean;        
  error: string | null;   
  
}

export const initialOrderState: OrderState = {
  saving: false,
  error: null,
  
};
