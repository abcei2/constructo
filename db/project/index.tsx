
import { query, where, getDocs, collection, addDoc, doc, getDoc, deleteDoc, updateDoc, DocumentReference, DocumentData, CollectionReference } from "firebase/firestore";
import { Category, EmployeeWage, Product, Project } from "../../types/dbTypes";
import db from "../firebase";

const PROJECTS_COLLECTION = "projects"
const CATEGORIES_COLLECTION = "categories"
const PRODUCTS_COLLECTION = "products"
const WAGES_COLLECTION = "wages"


const projectsCollection = collection(db, PROJECTS_COLLECTION)

export const newProject = (data: Project) =>{
    let  projectsRef: string | undefined = undefined
    addDoc(projectsCollection, data).then(projectRefItem => projectsRef = projectRefItem.id);
    return { projectsRef }
}


export const newCategory = ( projectRef: string, data:Category) => {    
    const categoriesCollection = collection(projectsCollection, projectRef, CATEGORIES_COLLECTION)
    let categoryRef:string | undefined = undefined
    addDoc(categoriesCollection, data).then(categoriesRefItem => categoryRef = categoriesRefItem.id)
    return {categoryRef}
}

export const newWage = (projectRef: string, data: EmployeeWage) => {
    const wagesCollection = collection(projectsCollection, projectRef, WAGES_COLLECTION)
    let wagesRef: string | undefined = undefined
    addDoc(wagesCollection, data).then(wageRefItem => wagesRef = wageRefItem.id)
    
    return { wagesRef }
}

export const newProduct = (projectRef: string, categoryRef: string, data:Product) => {    
    const productsCollection = collection(projectsCollection, projectRef, CATEGORIES_COLLECTION, categoryRef, PRODUCTS_COLLECTION)
    let productRef: string | undefined = undefined
    addDoc(productsCollection, data).then(categoriesRefItem =>categoryRef = categoriesRefItem.id)
    return { productRef }
}

export const getAllProjects = async () => {
    const q = query(projectsCollection);
    const projectSnap = await getDocs(q);
    return projectSnap.docs.map((doc) => {
        return {
            ...doc.data(),
            ref:doc.id
        }
    });
}

export const getAllCategories = async (projectRef: string) => {
    const categoriesCollection = collection(projectsCollection, projectRef, CATEGORIES_COLLECTION)
    const q = query(categoriesCollection);
    const categoriesSnap = await getDocs(q);
    return categoriesSnap.docs.map((doc) => {
        return {
            ...doc.data(),
            ref: doc.id
        }
    } );
}

export const getAllProducts= async (projectRef: string, categoryRef:string) => {
    const productsCollection = collection(projectsCollection, projectRef, CATEGORIES_COLLECTION, categoryRef, PRODUCTS_COLLECTION)
   
    const q = query(productsCollection);
    const productsSnap = await getDocs(q);
    return productsSnap.docs.map((doc) => {
        return {
            ...doc.data(),
            ref: doc.id
        }
    });
}