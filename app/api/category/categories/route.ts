import { connectToDB } from "@/utils/mongodb";
import Category from '@/models/category';
import { NextResponse } from 'next/server';


export async function GET(req: Request){

    try{

        await connectToDB();

        const categories = await Category.find({}).sort({ createdAt: -1 });

        return NextResponse.json(categories, {status: 200})


    }catch(error){
        console.error('Error in fetching category:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }

}