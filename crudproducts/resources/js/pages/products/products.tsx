import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';

export default function ProductCrud({ products }: { products: any[] }) {
    const [editingProduct, setEditingProduct] = useState<any>(null);

    
    const { data, setData, post, put, reset, errors } = useForm({
        name: '',
        description: '',
        price: '',
    });


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingProduct) {
            put(`/products/${editingProduct.id}`, {
                onSuccess: () => resetForm()
            });
        } else {
            post('/products', {
                onSuccess: () => resetForm()
            });
        }
    };

    
    const edit = (product: any) => {
        setEditingProduct(product);
        setData({
            name: product.name,
            description: product.description || '',
            price: product.price,
        });
    };

    
    const destroy = (id: number) => {
        if (confirm('¿Seguro que quieres borrar este producto?')) {
            router.delete(`/products/${id}`);
        }
    };

    const resetForm = () => {
        setEditingProduct(null);
        reset();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10 font-sans">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    📦 Mis Productos
                </h1>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="mb-10 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Nombre del producto"
                            className="p-2 border rounded w-full"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Precio"
                            className="p-2 border rounded w-full"
                            value={data.price}
                            onChange={e => setData('price', e.target.value)}
                        />
                         <input
                            type="text"
                            placeholder="Descripción (opcional)"
                            className="p-2 border rounded w-full"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                        />
                    </div>
                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                    
                    <div className="mt-4 flex gap-2">
                        <button 
                            type="submit"
                            className={`px-4 py-2 rounded text-white font-bold transition ${editingProduct ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                        >
                            {editingProduct ? 'Actualizar Producto' : 'Guardar Nuevo'}
                        </button>
                        {editingProduct && (
                            <button 
                                type="button" 
                                onClick={resetForm}
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-700"
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>

                {/* Tabla de Productos */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Nombre</th>
                                <th className="py-3 px-6 text-left">Descripción</th>
                                <th className="py-3 px-6 text-center">Precio</th>
                                <th className="py-3 px-6 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {products.map((product) => (
                                <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">
                                        {product.name}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {product.description}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        ${product.price}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex item-center justify-center gap-2">
                                            <button 
                                                onClick={() => edit(product)}
                                                className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                            >
                                                ✏️
                                            </button>
                                            <button 
                                                onClick={() => destroy(product.id)}
                                                className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-4">No hay productos aún.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}