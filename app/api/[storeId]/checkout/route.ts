import Stripe from 'stripe';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stipe';
import prismadb from '@/lib/prismadb';
