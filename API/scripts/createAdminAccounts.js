/**
 * Script to create default admin, manager, and user accounts
 * Run this script to set up test accounts in the database
 */

import mongoose from 'mongoose';
import '../models/connection.js';
import UserSchemaModel from '../models/user.model.js';

const testAccounts = [
  {
    _id: 1,
    name: "Admin User",
    email: "admin@shippingwar.com",
    password: "admin123",
    mobile: "9999999999",
    address: "Admin Office, Shipping War HQ",
    city: "Indore",
    gender: "male",
    role: "admin",
    status: 1,
    info: new Date()
  },
  {
    _id: 2,
    name: "Manager User",
    email: "manager@shippingwar.com",
    password: "manager123",
    mobile: "8888888888",
    address: "Manager Office, Logistics Center",
    city: "Bhopal",
    gender: "male",
    role: "manager",
    status: 1,
    info: new Date()
  },
  {
    _id: 3,
    name: "Demo User",
    email: "user@shippingwar.com",
    password: "user123",
    mobile: "7777777777",
    address: "User Address, Residential Area",
    city: "Mumbai",
    gender: "male",
    role: "user",
    status: 1,
    info: new Date()
  }
];

async function createTestAccounts() {
  try {
    console.log('🔍 Checking existing accounts...\n');

    for (const account of testAccounts) {
      const existing = await UserSchemaModel.findOne({ email: account.email });
      
      if (existing) {
        console.log(`✅ ${account.role.toUpperCase()} account already exists: ${account.email}`);
        
        // Update role and status if needed
        if (existing.role !== account.role || existing.status !== account.status) {
          await UserSchemaModel.updateOne(
            { email: account.email },
            { $set: { role: account.role, status: account.status } }
          );
          console.log(`   ↳ Updated role to: ${account.role}, status: ${account.status}`);
        }
      } else {
        await UserSchemaModel.create(account);
        console.log(`✨ Created ${account.role.toUpperCase()} account: ${account.email}`);
        console.log(`   ↳ Password: ${account.password}`);
      }
    }

    console.log('\n✅ All test accounts are ready!\n');
    console.log('📋 Account Summary:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('ADMIN:');
    console.log('  Email: admin@shippingwar.com');
    console.log('  Password: admin123');
    console.log('');
    console.log('MANAGER:');
    console.log('  Email: manager@shippingwar.com');
    console.log('  Password: manager123');
    console.log('');
    console.log('USER:');
    console.log('  Email: user@shippingwar.com');
    console.log('  Password: user123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating test accounts:', error);
    process.exit(1);
  }
}

// Run the script
createTestAccounts();
