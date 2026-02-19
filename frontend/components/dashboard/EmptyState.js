'use client';

import React from 'react';
import { Button } from '../ui/button';

export function EmptyState({ icon: Icon, title, description, action, actionLabel }) {
    return (
        <div className="card-base p-12 text-center flex flex-col items-center justify-center min-h-96">
            <div className="w-20 h-20 bg-surface-secondary rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Icon size={40} className="text-text-tertiary" />
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-2">{title}</h3>
            <p className="text-text-tertiary text-sm max-w-xs mb-6">{description}</p>
            {action && actionLabel && (
                <button
                    onClick={action}
                    className="btn-primary text-sm"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
}
